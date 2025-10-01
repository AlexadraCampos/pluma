import cors from "cors";
import usuariosRoutes from "./routes/usuarios.js"; 
import { setupWebSocket } from "./routes/bot.js";
import express from 'express';
import http from 'http';

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: [ "GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorizatin"] 
}));

app.options('*', cors());

// Rotas de autenticação
app.use("/usuarios", usuariosRoutes );

// WebSocket
const server = http.createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));

export default app;
