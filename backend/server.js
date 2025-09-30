import cors from "cors";
import usuariosRoutes from "./routes/usuarios.js"; 
import { setupWebSocket } from "./routes/bot.js";
import express from 'express';
import http from 'http';

const app = express();
app.use(express.json());

// Middleware CORS manual
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '');
  res.setHeader('Access-Control-Allow-Methods', '');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Rotas de autenticação
app.use("/usuarios", usuariosRoutes );

// WebSocket
const server = http.createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));

export default app;
