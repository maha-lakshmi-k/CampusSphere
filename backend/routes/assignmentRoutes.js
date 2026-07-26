const express = require("express");
const router = express.Router();
const {
    createAssignment,
    getAssignments,
    getMyAssignments,
    updateAssignment,
    deleteAssignment
} = require("../controllers/assignmentController");
const {
    verifyToken
} = require("../middlewares/authMiddleware");
const {
    authorizeRoles
} = require("../middlewares/roleMiddleware");

// Create Assignment

router.post(
    "/",
    verifyToken,
    authorizeRoles(
        "faculty",
        "admin"

    ),
    createAssignment
);
// Get Assignments
router.get(
    "/",
    verifyToken,
    getAssignments
);
// Get My Assignments
router.get(
    "/my-assignments",
    verifyToken,
    authorizeRoles(
        "faculty"
    ),
    getMyAssignments
);
// Update Assignment
router.put(
    "/:id",
    verifyToken,
    authorizeRoles(

        "faculty",
        "admin"

    ),
    updateAssignment
);

// Delete Assignment
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles(
        "faculty",
        "admin"
    ),
    deleteAssignment
);
module.exports = router;