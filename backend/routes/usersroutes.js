import express from "express";


const authRoutes = express.Router();

const users = []

authRoutes.post('/users', (request, response) => {
  response.send('teste');
  console.log(request)
})


authRoutes.get('/users', (request, response) => {
  response.send('Rota de usuários');

});

export default authRoutes;


