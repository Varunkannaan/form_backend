require("dotenv").config();
const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");
const app = express();

const employee = require("./routers/employee")

app.use(cors());
app.use(express.json());


app.use("/api",employee)

app.use((err, req, res, next) => {
  if (!err.message) err.message = "Oh boy,Something went wrong";
  res.json({ error: err.message });
});

app.listen({ port: 5000 }, async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
});
