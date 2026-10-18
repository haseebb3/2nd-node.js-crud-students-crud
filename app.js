const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/studentsRouter");


app.use(cors());
app.use(express.json());
app.use("/api/students",router)



app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

