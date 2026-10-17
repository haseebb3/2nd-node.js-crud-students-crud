const students = [
  {
    id: "1",
    fname: "Alex",
    lname: "Morgan",
    email: "alex.morgan@example.com",
    contact: "+1-555-0198",
    createdAt: "2026-09-01T08:30:00Z",
    updatedAt: null
  },
  {
    id: "2",
    fname: "Liam",
    lname: "Nguyen",
    email: "liam.nguyen@example.com",
    contact: "+1-555-0147",
    createdAt: "2026-09-01T09:15:22Z",
    updatedAt: null
  },
  {
    id: "3",
    fname: "Sofia",
    lname: "Rodriguez",
    email: "sofia.rod@example.com",
    contact: "+1-555-0173",
    createdAt: "2026-09-02T11:05:00Z",
    updatedAt: null
  },
  {
    id: "4",
    fname: "Jordan",
    lname: "Smith",
    email: "jordan.smith@example.com",
    contact: "+1-555-0122",
    createdAt: "2026-09-10T14:00:00Z",
    updatedAt: null
  },
  {
    id: "5",
    fname: "Aisha",
    lname: "Aminu",
    email: "aisha.a@example.com",
    contact: "+1-555-0165",
    createdAt: "2026-09-15T10:22:18Z",
    updatedAt: null
  }
];

const getStudents = (req, res) => {
  try {
    res.json({
      ok: true,
      message: "students data fetched successfully...",
      data: students
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error while fetching students",
      error: err.message
    });
  }
};

const getStudent = (req, res) => {
  const { id } = req.params;

  try {
    const student = students.find((item) => item.id === id);
    if (!student) {
      return res.status(404).json({
        ok: false,
        message: `Student with id : ${id} doesn't exist...`
      });
    }

    res.status(200).json({
      ok: true,
      message: `Student with id ${id} fetched successfylly...`,
      data: student
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: `Error while fetching student witd id : ${id}`,
      error: err.message
    });
  }
};

const deleteStudent = (req, res) => {
  const { id } = req.params;

  try {
    const deleteIndex = students.findIndex((student) => student.id === id);
    if (deleteIndex === -1) {
      return res.status(404).json({
        ok: false,
        message: `student witd id : ${id} doesn't exist`
      });
    }

    const [deletedStudent] = students.splice(deleteIndex, 1);
    res.status(200).json({
      ok: true,
      messages: `Student with id ${id} is deleted successfully...`,
      data: deletedStudent
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: `Error while deleting student witd id : ${id}`,
      error: err.message
    });
  }
};

const createStudent = (req, res) => {
  try {
    const { fname, lname, email, contact } = req.body;
    if (!fname || !contact) {
      return res.status(400).json({
        ok: false,
        message: "fname and contact are required fields"
      });
    }

    const newStudent = {
      fname,
      lname: lname || "Unknown",
      email: email || "Unknown",
      contact,
      createdAt: Date.now(),
      updatedAt: null,
      id: String(Date.now())
    };

    students.unshift(newStudent);
    res.status(200).json({
      ok: true,
      message: `New student with id ${newStudent.id} created successfully...`,
      data: newStudent
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error while Creating new Student",
      error: err.message
    });
  }
};

const updateStudent = (req, res) => {
  const { id } = req.params;

  try {
    const updateIndex = students.findIndex((student) => student.id === id);
    if (updateIndex === -1) {
      return res.status(404).json({
        ok: false,
        message: `Student with id : ${id} doesn't exist...`
      });
    }

    const { fname, lname, email, contact } = req.body;
    if (!fname || !contact) {
      return res.status(400).json({
        ok: false,
        message: "fname and contact are required fields"
      });
    }

    const updatedStudent = {
      ...students[updateIndex],
      fname,
      lname: lname || "Unknown",
      contact,
      email: email || "Unknown",
      updatedAt: Date.now()
    };

    students[updateIndex] = updatedStudent;

    res.status(200).json({
      ok: true,
      message: `Student with id : ${id} is updated successfully...`,
      data: updatedStudent
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: `Error while updating student with di : ${id}`,
      error: err.message
    });
  }
};

module.exports = {
  getStudents,
  getStudent,
  deleteStudent,
  createStudent,
  updateStudent
};
