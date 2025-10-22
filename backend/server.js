import cors from "cors";
import  usuariosRoutes from "./routes/usuarios.js";
import { setupWebSocket } from "./routes/bot.js";
import express from 'express';
import http from 'http';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());


//  Conexão com o banco
const uri = process.env.MONGO_URI; 
export const client = new MongoClient(uri);

const corsOptions = {
  origin: ['http://localhost:5000', 'http://localhost:5173','https://pluma-1.onrender.com', 'https://pluma-7rog.onrender.com'],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use('/usuarios', usuariosRoutes);

const server = http.createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));

export default app;
