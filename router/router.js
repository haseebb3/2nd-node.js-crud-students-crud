const express = require("express");
const {
  getStudents,
  getStudent,
  deleteStudent,
  createStudent,
  updateStudent
} = require("../controller/data");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    '<h1 style="background-color:yellow"> Hello Node.js</h1> <h3>crud using node.js and express.js</h3>'
  );
});

router.get("/api/students", getStudents);
router.get("/api/students/:id", getStudent);
router.delete("/api/students/:id", deleteStudent);
router.post("/api/students", createStudent);
router.patch("/api/students/:id", updateStudent);

module.exports = router;
