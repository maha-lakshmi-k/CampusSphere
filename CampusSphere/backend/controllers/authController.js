const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER

const register = async (req, res) => {

    try {

        const {

            name,
            email,
            password,
            role,
            branch,
            year,
            registration_no

        } = req.body;


        // Required Fields Validation

        if (

            !name ||
            !email ||
            !password ||
            !role

        ) {

            return res.status(400).json({

                message:
                    "All required fields are missing."

            });

        }


        // Valid Roles

        const validRoles = [

            "student",
            "faculty"

        ];


        if (

            !validRoles.includes(role)

        ) {

            return res.status(400).json({

                message:
                    "Invalid Role."

            });

        }



        // Email Already Exists ?

        const userExists =
            await pool.query(

                "SELECT * FROM users WHERE email=$1",

                [email]

            );


        if (userExists.rows.length > 0) {

            return res.status(400).json({

                message:
                    "Email already exists."

            });

        }



        // Valid Branches

        const validBranches = [

            "CSE",
            "IT",
            "ECE",
            "AIML",
            "DS",
            "CSBS"

        ];


        if (

            branch &&
            !validBranches.includes(branch)

        ) {

            return res.status(400).json({

                message:
                    "Invalid Branch."

            });

        }



        // STUDENT VALIDATIONS

        if (role === "student") {


            if (

                !registration_no ||
                !branch ||
                !year

            ) {

                return res.status(400).json({

                    message:
                        "Registration Number, Branch and Year are required for students."

                });

            }


            const validEmail =

                `${registration_no}@svcew.edu.in`;


            if (

                email !== validEmail

            ) {

                return res.status(400).json({

                    message:
                        `Email must be ${validEmail}`

                });

            }

        }



        // FACULTY VALIDATIONS

        if (role === "faculty") {

            if (!branch) {

                return res.status(400).json({

                    message:
                        "Branch is required for faculty."

                });

            }

        }



        // HASH PASSWORD

        const hashedPassword =
            await bcrypt.hash(

                password,

                10

            );



        // INSERT USER

        await pool.query(

            `
            INSERT INTO users(

                name,
                email,
                password,
                role,
                branch,
                year,
                registration_no

            )

            VALUES(

                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7

            )
            `,

            [

                name,
                email,
                hashedPassword,
                role,
                branch || null,
                year || null,
                registration_no || null

            ]

        );



        return res.status(201).json({

            message:
                "User Registered Successfully."

        });

    }

    catch (error) {

        console.error(

            "Register Error :",

            error.message

        );


        return res.status(500).json({

            message:
                "Internal Server Error."

        });

    }

};




// LOGIN

const login = async (req, res) => {


    try {

        const {

            email,
            password

        } = req.body;


        if (

            !email ||
            !password

        ) {

            return res.status(400).json({

                message:
                    "Email and Password are required."

            });

        }



        const user =
            await pool.query(

                "SELECT * FROM users WHERE email=$1",

                [email]

            );



        if (

            user.rows.length === 0

        ) {

            return res.status(401).json({

                message:
                    "Invalid Credentials."

            });

        }



        const existingUser =
            user.rows[0];



        const isMatched =
            await bcrypt.compare(

                password,

                existingUser.password

            );



        if (!isMatched) {

            return res.status(401).json({

                message:
                    "Invalid Credentials."

            });

        }



        const token = jwt.sign(

            {

                id:
                    existingUser.id,

                role:
                    existingUser.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );



        return res.status(200).json({

            message:
                "Login Successful.",

            token,

            user: {

                id:
                    existingUser.id,

                name:
                    existingUser.name,

                email:
                    existingUser.email,

                role:
                    existingUser.role,

                branch:
                    existingUser.branch,

                year:
                    existingUser.year,

                registration_no:
                    existingUser.registration_no

            }

        });

    }

    catch (error) {

        console.error(

            "Login Error :",

            error.message

        );


        return res.status(500).json({

            message:
                "Internal Server Error."

        });

    }

};




// PROFILE

const profile = (req, res) => {

    return res.status(200).json({

        message:
            "Profile Accessed Successfully.",

        user:
            req.user

    });

};




// GET CURRENT USER

const me = async (req, res) => {


    try {

        const result =
            await pool.query(

                `
                SELECT

                id,
                name,
                email,
                role,
                branch,
                year,
                registration_no

                FROM users

                WHERE id=$1
                `,

                [req.user.id]

            );


        return res.status(200).json(

            result.rows[0]

        );

    }

    catch (error) {

        console.error(

            "Get User Error :",

            error.message

        );


        return res.status(500).json({

            message:
                "Internal Server Error."

        });

    }

};

// DELETE ACCOUNT

const deleteAccount=async(req,res)=>{

try{

const userId=req.user.id;

const role=req.user.role;


// STUDENT

if(role==="student"){

await pool.query(
`
DELETE FROM submissions
WHERE student_id=$1
`,
[userId]
);

}


// FACULTY

if(role==="faculty"){

// delete all submissions of
// faculty assignments

await pool.query(
`
DELETE FROM submissions
WHERE assignment_id IN(

SELECT id
FROM assignments
WHERE uploaded_by=$1

)
`,
[userId]
);


// delete faculty notices

await pool.query(
`
DELETE FROM notices
WHERE uploaded_by=$1
`,
[userId]
);


// delete faculty assignments

await pool.query(
`
DELETE FROM assignments
WHERE uploaded_by=$1
`,
[userId]
);

}


// ADMIN

if(role==="admin"){

await pool.query(
`
DELETE FROM notices
WHERE uploaded_by=$1
`,
[userId]
);


await pool.query(
`
DELETE FROM submissions
WHERE assignment_id IN(

SELECT id
FROM assignments
WHERE uploaded_by=$1

)
`,
[userId]
);


await pool.query(
`
DELETE FROM assignments
WHERE uploaded_by=$1
`,
[userId]
);

}


// finally delete user

await pool.query(
`
DELETE FROM users
WHERE id=$1
`,
[userId]
);


return res.status(200).json({

message:
"Account Deleted Successfully."

});

}

catch(error){

console.error(
"Delete Account Error :",
error.message
);


return res.status(500).json({

message:
"Internal Server Error."

});

}

};


module.exports = {

    register,
    login,
    profile,
    me,
    deleteAccount

};