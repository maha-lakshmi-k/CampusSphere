const express = require("express");

const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const { createNotice, getNotices, getMyNotices, deleteNotice, updateNotice } = require("../controllers/noticeController");

router.get(
  "/",
  verifyToken,
  getNotices
);

router.get(
  "/my-notices",
  verifyToken,
  authorizeRoles(
    "faculty"
  ),
  getMyNotices
);

router.post(
  "/",
  verifyToken,
  authorizeRoles(
    "faculty",
    "admin"
  ),
  createNotice
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles(
    "faculty",
    "admin"
  ),
  deleteNotice
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles(
        "faculty",
        "admin"
    ),
    updateNotice
);


module.exports = router;