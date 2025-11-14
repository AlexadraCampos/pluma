import cors from "cors";
import  router from "./routes/usuarios.js";
import { setupWebSocket } from "./routes/bot.js";
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:5000', 'http://localhost:5173','https://pluma-1.onrender.com', 'https://pluma-7rog.onrender.com'],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));


app.use('/api', router);


// Servidor HTTP real
const server = http.createServer(app);

// WebSocket usar mesmo servidor
setupWebSocket(server);

// Porta exigida pelo Render
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));

export default app;
