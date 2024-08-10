const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("./middleware");

const signupBody = z.object({
  userName: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const signinBody = z.object({
  userName: z.string().email(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  const parsedUser = signupBody.safeParse(req.body);
  const randomBalance = Math.floor(Math.random() * 10000);

  //   console.log(randomBalance);

  if (!parsedUser) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    userName: req.body.userName,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  await Account.create({
    userId,
    balance: randomBalance,
  });

  res.status(200).json({
    message: "User created successfully",
    token,
  });
});

router.post("/signin", async (req, res) => {
  const parsedUser = signinBody.safeParse(req.body);

  if (!parsedUser) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({ token });

    return;
  }

  res.status(411).json({
    msg: "Your details are not in our database, please signup first!",
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const parsedUpdateBody = updateBody.safeParse(req.body);

  if (!parsedUpdateBody) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.status(200).json({
    message: "User details updated successfully!",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: { $regex: filter },
      },
      {
        lastName: { $regex: filter },
      },
    ],
  });

  res.json({
    users: users.map((user) => ({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
