import express from "express";
import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

const authRoutes = express.Router();
authRoutes.use(express.json())

const users = []

authRoutes.post('/users', async (request, response) => {
  
  await prisma.user.create({
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age
    }
  })
 
  response.status(201).json(request.body)
  
})


authRoutes.get('/users', (request, response) => {
  response.status(200).json(users);

});

export default authRoutes;

