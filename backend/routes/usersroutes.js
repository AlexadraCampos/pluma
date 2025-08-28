import express, { request, response } from "express";
import { PrismaClient } from "../src/generated/prisma/index.js";


const prisma = new PrismaClient();

const authRoutes = express.Router();
authRoutes.use(express.json());

authRoutes.post("/users", async (request, response) => {
  await prisma.user.create({
    data: {
      email: request.body.email,
      name: request.body.name,
      age: parseInt(request.body.age),
      password: request.body.password 
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

// # Endpoint de login

authRoutes.post("/login", async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: "E-mail e senha são obrigatórios." });
  }

  try {
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return response.status(401).json({ message: "Usuário não encontrado." });
    }

    if (user.password !== password) {
      return response.status(401).json({ message: "Senha incorreta." });
    }

    return response.status(200).json({ message: "Login bem-sucedido", user });
  } catch (error) {
    console.error("Erro no login:", error);
    return response.status(500).json({ message: "Erro no servidor." });
  }
});

export default authRoutes;
