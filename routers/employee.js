const { sequelize, Details } = require("../models");
const router = require("express").Router();
const { Op, where } = require("sequelize");
const { QueryTypes } = require("sequelize");

router.post("/employee", async (req, res, next) => {
  try {
    const body = { ...req.body };
    const employee = await Details.create(body);
    res.status(200).json(employee);
  } catch (err) {
    res.json({ "error": err.errors[0].message });
  }
});

router.get("/employee", async (req, res) => {
  try {
    const employees = await Details.findAll();
    return res.json(employees);
  } catch (err) {
    res.json({ "error": "cannot get" });
  }
});

router.get("/chart", async (req, res) => {
  try {
    const rolecount = await Details.findAll({
      attributes: [
        "role",
        [sequelize.fn("COUNT", sequelize.col("role")), "total"],
      ],
      group: ["role"],
    });

    const barchart = await Details.findAll({
      attributes: [
        "role",
        "experience",
        [sequelize.fn("COUNT", sequelize.col("experience")), "total"],
      ],
      group: ["role", "experience"],
    });

    const linechart = await Details.findAll({
      attributes: [
        "experience",
        "maxsalary",
        [sequelize.fn("COUNT", sequelize.col("maxsalary")), "total"],
      ],
      group: ["experience", "maxsalary"],
    });

    return res.json({
      rolewise: rolecount,
      barchart: barchart,
      linechart: linechart,
    });
  } catch (err) {
    res.json({ error: err.errors[0].message });
  }
});

module.exports = router;
