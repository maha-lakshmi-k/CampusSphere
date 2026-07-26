const pool = require("../config/db");
// Create Assignment
const createAssignment = async (req, res) => {

    try {
        const {
            title,
            description,
            branch,
            year,
            deadline
        } = req.body;
        // Required Fields Validation
        if (
            !title ||
            !description ||
            !branch ||
            !year ||
            !deadline
        ) {
            return res.status(400).json({
                message: "All fields are required."
            });
          }
        // Valid Branches
        const validBranches = [
            "CSE",
            "IT",
            "ECE",
            "AIML",
            "DS",
            "CSBS",
            "ALL"
        ];
        const validYears = [

            "1",
            "2",
            "3",
            "4",
            "ALL"
        ];

        if (!validBranches.includes(branch)) {
            return res.status(400).json({
                message: "Invalid Branch."
            });
        }

        if (!validYears.includes(year)) {
            return res.status(400).json({
                message: "Invalid Year."
            });
        }
        if (title.length < 5) {
            return res.status(400).json({
                message:
                    "Title must contain at least 5 characters."
            });
        }

        if (description.length < 10) {
            return res.status(400).json({
               message:
                    "Description must contain at least 10 characters."

            });
        }
        await pool.query(
            `
            INSERT INTO assignments(

                title,
                description,
                branch,
                year,
                deadline,
                uploaded_by
            )
            VALUES(

                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )
            `,
            [

                title,
                description,
                branch,
                year,
                deadline,
                req.user.id
            ]
        );
        return res.status(201).json({
            message:
                "Assignment Created Successfully."

        });
    }
    catch (error) {
        console.error(
            "Create Assignment Error :",
            error.message
        );
        return res.status(500).json({
            message:
                "Internal Server Error."
        });
    }
};
// Get Assignments
const getAssignments = async (req, res) => {

    try {

        const user = await pool.query(

            `
            SELECT branch,year
            FROM users
            WHERE id=$1
            `,

            [req.user.id]
        );
        const existingUser = user.rows[0];
        const assignments = await pool.query(
            `
            SELECT *
            FROM assignments
            WHERE
            (branch=$1 OR branch='ALL')
            AND
            (year=$2 OR year='ALL')
            ORDER BY created_at DESC
            `,
            [
                existingUser.branch,
                String(existingUser.year)
            ]
        );

        return res.status(200).json(
            assignments.rows
        );
    }
    catch (error) {
        console.error(
            "Get Assignments Error :",
            error.message
        );
        return res.status(500).json({
            message:
                "Internal Server Error."
        });
    }
};

// Get My Assignments
const getMyAssignments = async (req, res) => {
    try {
        const assignments = await pool.query(
            `
            SELECT *
            FROM assignments
            WHERE uploaded_by=$1
            ORDER BY created_at DESC
            `,
            [req.user.id]
        );
        return res.status(200).json(
            assignments.rows
        );
    }
    catch (error) {
        console.error(
            "Get My Assignments Error :",
            error.message
        );
        return res.status(500).json({
            message:
                "Internal Server Error."
        });
    }
};

// Update Assignment

const updateAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const {title,description,
            branch,year,deadline
        } = req.body;
        if (!title || !description || !branch ||
!year || !deadline
        ) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }
        const assignment = await pool.query(
            `
            SELECT *
            FROM assignments
            WHERE id=$1
            `,
            [assignmentId]
        );
        if (assignment.rows.length === 0) {
            return res.status(404).json({
                message:
                    "Assignment Not Found."
            });
        }

        const existingAssignment = assignment.rows[0];

        if (req.user.role === "faculty") {
            if (
                existingAssignment.uploaded_by !==
                req.user.id
            ) {
                return res.status(403).json({
                    message:
                        "Access Forbidden."
                });
            }
        }
        await pool.query(
            `
            UPDATE assignments
            SET
            title=$1,
            description=$2,
            branch=$3,
            year=$4,
            deadline=$5
            WHERE id=$6
            `,
            [
                title,
                description,
                branch,
                year,
                deadline,
                assignmentId
            ]
        );
        return res.status(200).json({
            message:
                "Assignment Updated Successfully."
        });
    }

    catch (error) {
        console.error(
            "Update Assignment Error :",
            error.message
        );
        return res.status(500).json({
            message:
                "Internal Server Error."
        });
    }
};

// Delete Assignment
const deleteAssignment = async (req, res) => {

    try {
        const assignmentId = req.params.id;
        const assignment = await pool.query(
            `
            SELECT * FROM assignments WHERE id=$1
            `,
            [assignmentId]
        );


        if (assignment.rows.length === 0) {
            return res.status(404).json({
                message:
                    "Assignment Not Found."
            });
        }
        const existingAssignment = assignment.rows[0];
        if (req.user.role === "faculty") {
            if (
                existingAssignment.uploaded_by !==
                req.user.id
            ) {
                return res.status(403).json({
                    message:"Access Forbidden."
                });
            }
        }
        await pool.query(
            `
            DELETEFROM assignments WHERE id=$1
            `,
            [assignmentId]
        );
        return res.status(200).json({
            message:
                "Assignment Deleted Successfully."
        });
    }
    catch (error) {
        console.error(
            "Delete Assignment Error :",
            error.message
        );

        return res.status(500).json({
            message:
                "Internal Server Error."
        });
    }
};

module.exports = {
    createAssignment,
    getAssignments,
    getMyAssignments,
    updateAssignment,
    deleteAssignment

};