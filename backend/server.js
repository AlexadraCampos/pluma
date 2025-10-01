import cors from "cors";
import usuariosRoutes from "./routes/usuarios.js";
import { setupWebSocket } from "./routes/bot.js";
import express from 'express';
import http from 'http';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["https://pluma-1.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use("/usuarios", usuariosRoutes);

const server = http.createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));

export default app;
