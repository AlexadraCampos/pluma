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
      password: request.body.password,
    
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

authRoutes.get("/", async (request, response) => {

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
authRoutes.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Usuário e senha são obrigatórios." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }, 
    });

    if (!user) {
      return res.status(401).json({ message: "Usuário não cadastrado." });
    }

    // Verificação de senha condicional
    if (!user.password) {
      return res.status(400).json({ message: "Senha ainda não cadastrada." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    return res.status(200).json({ message: "Login bem-sucedido", user });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
});

// Esqueci minha senha
authRoutes.put("/password", async (request, response) => {
  const { email, newPassword } = request.body;

  if (!email || !newPassword) {
    return response.status(400).json({ message: "E-mail e nova senha são obrigatórios." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrado." });
    }

    await prisma.user.update({
      where: { email },
      data: { password: newPassword },
    });

    return response.status(200).json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    return response.status(500).json({ message: "Erro no servidor." });
  }
});


// Endpoint Cadastro
authRoutes.post("/Cadastro", async (req, res) => {
  const { email, name, age, password } = req.body;

  if (!email || !name || !age || !password) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já cadastrado." });
    }

    const user = await prisma.user.create({
      data: { email, name, age: parseInt(age), password },
    });

    return res.status(201).json({ message: "Cadastro realizado com sucesso.", user });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ message: "Erro no servidor." });
  }
});



export default authRoutes;