import express, { request } from "express";
import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

const authRoutes = express.Router();
authRoutes.use(express.json());

authRoutes.post("/users", async (request, response) => {
  await prisma.user.create({
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age,
    },
  });

  response.status(201).json(request.body);
});

authRoutes.put("/users/:id", async (request, response) => {
  await prisma.user.update({
    where: {
      id: request.params.id,
    },

    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age,
    },
  });

  response.status(201).json(request.body);
});

authRoutes.get("/users", async (request, response) => {

  let users = []

  if (request.query){
    
    users = await prisma.user.findMany({
      where: {
        name: request.query.name,
        email: request.query.name,
        age: request.query.name
      }
  });

    
    
  } else {

    users = await prisma.user.findMany();

  }
  
  response.status(200).json(users);

});

authRoutes.delete("/users/:id", async (request, response) => {
  await prisma.user.delete({
    where: {
      id: request.params.id,
    },
  });

  response.status(200).json({ message: "O Usuário foi deletado com Sucesso!" });
});

export default authRoutes;
