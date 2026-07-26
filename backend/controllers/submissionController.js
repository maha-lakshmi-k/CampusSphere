const pool = require("../config/db");

// Submit Assignment

const submitAssignment = async (req,res)=>{

try{

const{
assignment_id,
submission_text
}=req.body;


if(
!assignment_id||
!submission_text
){

return res.status(400).json({
message:
"All fields are required."
});

}


// Assignment Exists ?

const assignment=
await pool.query(
`
SELECT *
FROM assignments
WHERE id=$1
`,
[assignment_id]
);


if(assignment.rows.length===0){

return res.status(404).json({
message:
"Assignment Not Found."
});

}


// Already Submitted ?

const submission=
await pool.query(
`
SELECT *
FROM submissions
WHERE
assignment_id=$1
AND
student_id=$2
`,
[
assignment_id,
req.user.id
]
);


if(submission.rows.length>0){

return res.status(400).json({
message:
"You have already submitted this assignment."
});

}


await pool.query(
`
INSERT INTO submissions(

assignment_id,
student_id,
submission_text

)

VALUES(

$1,
$2,
$3

)
`,
[
assignment_id,
req.user.id,
submission_text
]
);


return res.status(201).json({

message:
"Assignment Submitted Successfully."

});

}

catch(error){

console.error(
"Submission Error :",
error.message
);

return res.status(500).json({
message:
"Internal Server Error."
});

}

};



// View My Submissions

const getMySubmissions=async(req,res)=>{

try{

const submissions=
await pool.query(
`
SELECT
s.*,
a.title AS assignment_title
FROM submissions s
JOIN assignments a
ON s.assignment_id=a.id
WHERE s.student_id=$1
ORDER BY s.id DESC
`,
[req.user.id]
);


return res.status(200).json(
submissions.rows
);

}

catch(error){

console.error(
"Get My Submission Error :",
error.message
);

return res.status(500).json({
message:
"Internal Server Error."
});

}

};




// Faculty View Submissions

const getAssignmentSubmissions=async(req,res)=>{

try{

const assignmentId=
req.params.assignmentId;


const submissions=
await pool.query(
`
SELECT
s.*,
u.name AS student_name,
a.title AS assignment_title
FROM submissions s
JOIN users u
ON s.student_id=u.id
JOIN assignments a
ON s.assignment_id=a.id
WHERE s.assignment_id=$1
ORDER BY s.id DESC
`,
[assignmentId]
);


return res.status(200).json(
submissions.rows
);

}

catch(error){

console.error(
"Get Submission Error :",
error.message
);

return res.status(500).json({

message:
"Internal Server Error."

});

}

};




// Delete Submission

const deleteSubmission=async(req,res)=>{

try{

const submissionId=
req.params.id;


// Submission Exists ?

const submission=
await pool.query(
`
SELECT *
FROM submissions
WHERE id=$1
`,
[submissionId]
);


if(submission.rows.length===0){

return res.status(404).json({

message:
"Submission Not Found."

});

}


// Student owns the submission ?

if(
submission.rows[0].student_id
!==req.user.id
){

return res.status(403).json({

message:
"Unauthorized Access."

});

}


await pool.query(
`
DELETE FROM submissions
WHERE id=$1
`,
[submissionId]
);


return res.status(200).json({

message:
"Submission Deleted Successfully."

});

}

catch(error){

console.error(
"Delete Submission Error :",
error.message
);

return res.status(500).json({

message:
"Internal Server Error."

});

}

};



module.exports={

submitAssignment,
getMySubmissions,
getAssignmentSubmissions,
deleteSubmission

};