const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("./middleware");
const router = express.Router();
const z = require("zod");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  //   console.log(req.userId);

  const account = await Account.findOne({
    userId: req.userId,
  });

  console.log(account.balance);

  res.status(200).json({
    balance: account.balance,
  });
});

const transferSchema = z.object({
  to: z.string(),
  amount: z.number(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { to, amount } = req.body;

  console.log(to, amount);

  if (!to || !amount) {
    res.status(411).json({
      msg: "Invalid inputs",
    });
  }

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);
  console.log(toAccount);

  if (!toAccount || amount <= 0) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Invalid account / amount should not be less than 0",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();

  res.status(200).json({
    message: "Transaction done successful!😊",
  });
});

module.exports = router;
