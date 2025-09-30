import cors from "cors";
import usuariosRoutes from "./routes/usuarios.js"; 
import { setupWebSocket } from "./routes/bot.js";
import express from 'express';
import http from 'http';

const app = express();
app.use(express.json());

// Middleware CORS manual
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Configuração de CORS com pacote
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pluma-1.onrender.com",
    "https://pluma-7rog.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Rotas de autenticação
app.use("/usuarios", usuariosRoutes );

// WebSocket
const server = http.createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));

export default app;
