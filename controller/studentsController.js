const students = require("../data");

const getAllStudents = (req, res) => {
  try {
    res.json({
      ok: true,
      message: `students data fetched successfully...`,
      data: students
    })
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: `Error while fetching students`,
      error: err.message
    })
  }
}

const getSingleStudent =  (req, res) => {
  const stdId = req.params.id;
  try {
    const student = students.find(s => s.id === stdId);
    if (!student) {
      return res.status(404).json({
        ok: false,
        message: `Student with id : ${stdId} doesn't exist...`
      })
    }

    res.status(200).json({
      ok: true,
      message: `Student with id ${stdId} fetched successfylly...`,
      data: student
    })

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: `Error while fetching student witd id : ${stdId}`,
      error: err.message
    })
  }
}


const createStudent = (req, res) => {
  try{
    const {fname, lname, email, contact} = req.body;
    if(!fname || !contact){
      return res.status(400).json({
        ok : false,
        message : `fname and lname are required fields...`
      })
    }

    const newStd = {
      fname : fname, 
      lname : lname || "Unknown",
      email : email || "Unknown",
      contact : contact,
      createdAt : Date.now(),
      updatedAt : null,
      id : String(Date.now())
    }

    students.unshift(newStd);
    res.status(200).json({
      ok : true,
      message : `New student with id ${newStd.id} created successfully...`,
      data : newStd
    })
  } catch(err){
    res.status(500).json({
      ok: false,
      message: `Error while Creating new Student`,
      error: err.message
    })
  }
}


const updateStudent = (req, res) => {
  const updateId = req.params.id;
  try{
    const {fname, lname, email, contact} = req.body;
    const updateIndex = students.findIndex(s => s.id === updateId);
    if(!fname || !contact){
      return res.status(400).json({
      ok : false,
      message : `fname and contact are required fields`
     })
    }

    const updatedObj = {
      ...students[updateIndex],
      fname : fname,
      lname : lname || "Unknown",
      contact : contact,
      email : email || "Unknown",
      updatedAt : Date.now()
    }

    students[updateIndex] = updatedObj;

    res.status(200).json({
      ok : true,
      message : `Student with id : ${updateId} is updated successfully...`,
      data : updatedObj
    })

  } catch(err){
     res.status(500).json({
      ok : false,
      message : `Error while updating student with di : ${updateId}`,
      error : err.message
     })
  }
}


const deletedStudent =  (req, res) => {
  const deleteId = req.params.id;
  try {
    const deleteIndex = students.findIndex(s => s.id === deleteId);
    if (deleteIndex === -1) {
      res.status(404).json({
        ok: false,
        message: `student witd id : ${deleteId} doesn't exist`
      })
    }

    const deletedStudent = students.splice(deleteIndex, 1);
    res.status(200).json({
      ok: true,
      messages: `Student with id ${deleteId} is deleted successfully...`,
      data: deletedStudent[0]
    })

  } catch (err) {
    res.status(500).json({
      ok: false,
      message: `Error while deleting student witd id : ${deleteId}`,
      error: err.message
    })
  }
}

module.exports = {
    getAllStudents,
    getSingleStudent,
    createStudent,
    updateStudent,
    deletedStudent
}