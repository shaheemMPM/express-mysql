// Core Imports
const express = require("express");
const cors = require("cors");

const app = express();

const dbService = require("./dbService");

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const db = dbService.getDbServiceInstance();

  let result;
  try {
    result = await db.getAllData();
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }

  res.json({ data: result });
});

app.get("/getbalance/:username", async (req, res) => {
  const username = req.params.username;

  const db = dbService.getDbServiceInstance();

  let result;
  try {
    result = await db.getUserByUsername(username);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }

  res.json({ balance: result[0].balance });
});

app.patch("/withdraw", async (req, res) => {
  const { amount, username } = req.body;

  const db = dbService.getDbServiceInstance();

  let users = [];
  try {
    users = await db.getUserByUsername(username);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }

  if (users.length === 0) {
    return res.status(404).json({
      status: "NOT_FOUND",
      message: "user not found",
    });
  }

  const user = users[0];

  if (user.balance < amount) {
    return res.status(422).json({
      status: "NO_BALANCE",
      message: "in sufficient balance",
    });
  }

  try {
    await db.updateBalance(user.balance - amount, username);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }

  let currentUser = [];
  try {
    currentUser = await db.getUserByUsername(username);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }

  res.status(200).json({
    message: "amount withrawal successful",
    status: "SUCCESS",
    user: currentUser[0],
  });
});

app.listen(5000, () => {
  console.log("Running on port 5000");
});
