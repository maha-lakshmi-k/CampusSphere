const express=require("express");
const router=express.Router();

const{

submitAssignment,
getMySubmissions,
getAssignmentSubmissions,
deleteSubmission

}=require("../controllers/submissionController");


const{
verifyToken
}=require("../middlewares/authMiddleware");


const{
authorizeRoles
}=require("../middlewares/roleMiddleware");



// Student

router.post(
"/",
verifyToken,
authorizeRoles(
"student"
),
submitAssignment
);



// Student

router.get(
"/my-submissions",
verifyToken,
authorizeRoles(
"student"
),
getMySubmissions
);



// Student

router.delete(
"/:id",
verifyToken,
authorizeRoles(
"student"
),
deleteSubmission
);



// Faculty & Admin

router.get(
"/:assignmentId",
verifyToken,
authorizeRoles(
"faculty",
"admin"
),
getAssignmentSubmissions
);


module.exports=router;