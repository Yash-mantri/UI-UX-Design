const path = require("path");
require(`dotenv`).config({
  path: path.join(__dirname, "../views/.env")
});
const express = require("express");
const cors = require("cors");

const port=process.env.SERVER_PORT
console.log(port)

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

app.listen(6969, "192.168.0.108", () => {
  console.log(`Server is running on http://192.168.0.108:6969`);
});
