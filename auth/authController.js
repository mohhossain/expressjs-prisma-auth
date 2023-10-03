import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

router.post("/signin", async function (req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body["email"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isValidPassword = bcrypt.compareSync(
      req.body["password"],
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json("Access denied!");
    }

    const token = jwt.sign({ id: user.id }, "supersecret", {
      expiresIn: "24h",
    });

    res.cookie("auth", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.json(error);
  }
});
router.post("/signup", async function (req, res) {
  try {
    const result = await prisma.user.create({
      data: {
        email: req.body["email"],
        password: bcrypt.hashSync(req.body["password"]),
        name: req.body["name"],
      },
    });
    const payload = { id: result.id };
    const token = jwt.sign(payload, "supersecret", { expiresIn: "24h" });

    res.cookie("auth", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/signout", async function (req, res) {
  res.clearCookie("auth", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.json("Session cleared");
});
export default router;
