import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const notFoundError = (res) => {
  return res.status(404).json({ error: "user not found" });
};

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// GET /users/:id

export const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (user) {
      res.json(user);
    } else {
      notFoundError(res);
    }
  } catch (error) {
    res.json({ error: error });
  }
};
