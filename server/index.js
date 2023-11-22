const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const ConfiDB = require("./Config/DB");
ConfiDB();
const AdminRoutes = require("./Routes/AdminRoutes");
const AllRoutes = require("./Routes/AllRoutes");
app.use("/api/Admin", AdminRoutes);
app.use("/api/", AllRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("All Good");
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Serever start on ${PORT}`);
});
