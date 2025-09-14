import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/usersroutes.js";
import { setupWebSocket } from "./routes/bot.js";

dotenv.config();

const app = express();
const server = http.createServer(app);


// Configuração de CORS
app.use(cors({
  origin: [
    "http://localhost:5173",  // Frontend local (Vite)
    "http://localhost:3001",  
    "https://pluma-1.onrender.com" // frontend em produção
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// Rotas de autenticação
app.use("/api/users", authRoutes);

// WebSocket
setupWebSocket(server);


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});


export default app;