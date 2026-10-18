const express = require("express");
const router = express.Router();
const {getAllStudents,createStudent,updateStudent,getSingleStudent,deletedStudent} = require("../controller/studentsController");

router.get("/", getAllStudents)
router.post("/", createStudent)
router.patch("/:id", updateStudent)
router.get("/:id", getSingleStudent)
router.delete("/:id", deletedStudent)

module.exports = router;