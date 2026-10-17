const express = require("express");
const cors = require("cors");
const router = require("./router/router");

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
}

module.exports = app;
