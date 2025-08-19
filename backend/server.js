
import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/usersroutes.js";
import { setupWebSocket } from "./routes/bot.js";


dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Rotas de autenticação
app.use("/api", authRoutes);

// WebSocket
setupWebSocket(server);

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
