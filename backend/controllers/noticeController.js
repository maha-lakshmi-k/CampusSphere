const pool = require("../config/db");

const createNotice = async (req, res) => {
  try {
    const { title, description, branch, year } = req.body;

    // Validations
    if (!title || !description || !branch || !year) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }
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
        message: "Title must contain at least 5 characters."
      });
    }
    if (description.length < 10) {
      return res.status(400).json({
        message:
          "Description must contain at least 10 characters."
      });
    }
    // uploaded_by comes from JWT Token
    const uploadedBy = req.user.id;

    await pool.query(
      `
            INSERT INTO notices(
                title,
                description,
                branch,
                year,
                uploaded_by
            )
            VALUES(
                $1,
                $2,
                $3,
                $4,
                $5
            )
            `,
      [
        title,
        description,
        branch,
        year,
        uploadedBy
      ]
    );
    return res.status(201).json({
      message: "Notice Created Successfully."
    });
  }
  catch (error) {
    console.error(
      "Create Notice Error :",
      error.message
    );
    return res.status(500).json({
      message: "Internal Server Error."
    });
  }
};

const getNotices = async (req, res) => {
  const user =

    await pool.query(

      "SELECT branch,year,role FROM users WHERE id=$1",

      [req.user.id]

    );
  const existingUser = user.rows[0];
  const notices =

    await pool.query(

      `

SELECT *
FROM notices
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
    notices.rows
  );
}
const getMyNotices = async (req, res) => {
  try {
    const notices = await pool.query(
      `
            SELECT id,title,description,branch,year,attachment,created_at
            FROM notices
            WHERE uploaded_by = $1
            ORDER BY created_at DESC
            `,
      [req.user.id]
    );
    return res.status(200).json(
      notices.rows
    );
  }
  catch (error) {
    console.error(
      "Get My Notices Error :",
      error.message
    );
    return res.status(500).json({
      message:
        "Internal Server Error."
    });

  }

};

const deleteNotice = async (req, res) => {
try{
const noticeId = req.params.id;
const notice = await pool.query(
    `
    SELECT *
    FROM notices
    WHERE id=$1
    `,
    [noticeId]
);
if(notice.rows.length===0){
    return res.status(404).json({
        message:
        "Notice Not Found."
    });
}
const existingNotice=notice.rows[0];

if(req.user.role==="faculty"){
    if(existingNotice.uploaded_by!==req.user.id){
        return res.status(403).json({
            message:"Access Forbidden."
        });
    }
}
await pool.query(
`
DELETE FROM notices WHERE id=$1
`,
[noticeId]
);
return res.status(200).json({
    message:"Notice Deleted Successfully."
});
} catch(error){
  console.error(
    "Delete Notice Error :",
    error.message
  );
  return res.status(500).json({
    message:
      "Internal Server Error."
  });
}
};

const updateNotice = async (req, res) => {
    try {
        const noticeId = req.params.id;
        const {
            title,
            description,
            branch,
            year
        } = req.body;

        if (!title || !description || !branch || !year) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }
        const notice = await pool.query(
            `
            SELECT * FROM notices WHERE id=$1
            `,
            [noticeId]
        );

        if (notice.rows.length === 0) {
            return res.status(404).json({
                message: "Notice Not Found."
            });
        }
        const existingNotice = notice.rows[0];
        // Ownership Verification

        if (req.user.role === "faculty") {
            if (
                existingNotice.uploaded_by !==
                req.user.id
            ) {
                return res.status(403).json({
                    message: "Access Forbidden."
                });
            }
        }
        // Update Notice
        await pool.query(
            `
            UPDATE notices
            SET
            title=$1,
            description=$2,
            branch=$3,
            year=$4
            WHERE id=$5
            `,
            [
                title,
                description,
                branch,
                year,
                noticeId
            ]
        );
        return res.status(200).json({
            message:
            "Notice Updated Successfully."
        });
    }
    catch (error) {
        console.error(
            "Update Notice Error :",
            error.message
        );
        return res.status(500).json({
            message:"Internal Server Error."
        });
    }
};

module.exports = {
  createNotice,
  getNotices,
  getMyNotices,
  deleteNotice,
  updateNotice
};