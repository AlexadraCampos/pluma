import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/usersroutes.js";
import { setupWebSocket } from "./routes/bot.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "https://pluma-1.onrender.com", // frontend no Render
  "http://localhost:3000", // Backend
  "https://localhost:5173" // Front
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`Origem bloqueada pelo CORS: ${origin}`);
      callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Middleware para logs de debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.get('Origin')}`);
  next();
});

// Permite que o navegador valide pré-voo
app.options("*", cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


// Rotas de autenticação
app.use("/api/users", authRoutes);

// WebSocket
setupWebSocket(server);

// Middleware de tratamento de erro global
app.use((error, req, res, next) => {
  console.error('Erro global:', error);
  res.status(500).json({ message: "Erro interno do servidor" });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Origens permitidas: ${allowedOrigins.join(', ')}`);
});

export default app;