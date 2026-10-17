
const students = [
  {
    "id": "1",
    "fname": "Alex",
    "lname": "Morgan",
    "email": "alex.morgan@example.com",
    "contact": "+1-555-0198",
    "createdAt": "2026-09-01T08:30:00Z",
    "updatedAt": null
  },
  {
    "id": "2",
    "fname": "Liam", 
    "lname": "Nguyen",
    "email": "liam.nguyen@example.com",
    "contact": "+1-555-0147",
    "createdAt": "2026-09-01T09:15:22Z",
    "updatedAt": null
  },
  {
    "id": "3",
    "fname": "Sofia",
    "lname": "Rodriguez",
    "email": "sofia.rod@example.com",
    "contact": "+1-555-0173",
    "createdAt": "2026-09-02T11:05:00Z",
    "updatedAt": null
  },
  {
    "id": "4",
    "fname": "Jordan",
    "lname": "Smith",
    "email": "jordan.smith@example.com",
    "contact": "+1-555-0122",
    "createdAt": "2026-09-10T14:00:00Z",
    "updatedAt": null
  },
  {
    "id": "5",
    "fname": "Aisha",
    "lname": "Aminu",
    "email": "aisha.a@example.com",
    "contact": "+1-555-0165",
    "createdAt": "2026-09-15T10:22:18Z",
    "updatedAt": null
  }
]

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());



//routes / apis
app.get("", (req, res) => {
  res.send(`<h1 style="background-color:yellow"> Hello Node.js</h1> <h3>crud using node.js and express.js</h3>`)
})


//all get 
app.get("/api/students", (req, res) => {
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
})

//get sigle 
app.get("/api/students/:id", (req, res) => {
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
})



//delete
app.delete("/api/students/:id", (req, res) => {
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
})


//create
app.post("/api/students", (req, res) => {
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
})

//update
app.patch("/api/students/:id", (req, res) => {
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
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})