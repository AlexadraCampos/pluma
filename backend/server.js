
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.js"; 
import { setupWebSocket } from "./routes/bot.js";
import express from 'express';
import http from 'http';


const app = express();
app.use(express.json());

// Configuração de CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pluma-1.onrender.com", // frontend em produção
    "https://pluma-7rog.onrender.com/usuarios" // Backend em produção
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