
import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/usersroutes.js";
import { setupWebSocket } from "./routes/bot.js";


dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['content-type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Rotas de autenticação
app.use("/api/users", authRoutes);

// WebSocket
setupWebSocket(server);

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
