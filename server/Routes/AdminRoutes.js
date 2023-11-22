const { Router } = require("express");
const AdminRoutes = Router();
const { AdminSignup } = require("../Controllers/AdminController");

AdminRoutes.post("/signup", AdminSignup);

module.exports = AdminRoutes;
