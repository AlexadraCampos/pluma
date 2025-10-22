import express from "express";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";


const router = express.Router();


const Usuario= "Alexandra's Org - 2025-08-18";
const senha = "jMiZUv0gAXmgiomz";
const clusterUrl = "pluma.xt4mndh.mongodb.net";
const dbName = "plumaweb"



const uri = "mongodb+srv://pluma:zrDZJw75zP9ZpXag@pluma.xt4mndh.mongodb.net/?retryWrites=true&w=majority&appName=pluma"
const client = new MongoClient(uri);


//  Endpoint login - 
router.post("/usuarios/Login", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const userCollection = db.collection("usuarios");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "🚫 E-mail e senha são obrigatórios." });
    }

    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "❌ Usuário não encontrado." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    res.status(200).json({ message: "✅ Login realizado com sucesso!", user });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
});


//  Rota Redefinição de senha 
router.put("/usuarios/Password", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "🚫 E-mail e nova senha são obrigatórios." });
    }

    const userCollection = db.collection("usuarios");
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: " ❌ Usuário não encontrado." });
    }

    // criptografar nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userCollection.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({ message: "✅ Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
});

// Rota Listagem de Usuários
router.get("/usuarios", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const userCollection  = db.collection("usuarios");
    const lista = await userCollection.find().toArray();
    res.status(200).json(lista);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "❌ Erro ao buscar usuários." });
  }
});

// rota cadastro
router.post("/usuarios/Cadastro", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const userCollection = db.collection("usuarios");

    const { nome, age, email, password } = req.body; //  pega os dados enviados

    if (!email || !password) {
      return res.status(400).json({ message: "🚫 E-mail e senha são obrigatórios." });
    }

    // criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const resultado = await userCollection.insertOne({
      nome,
      age,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ 
      message: "✅ Usuário cadastrado com sucesso!", 
      userId: resultado.insertedId 
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "❌ Erro ao cadastrar usuário" });
  }
});


// Rota Apagar usuário
router.delete("/usuarios/:email", async (req, res) =>  {
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const userCollection = db.collection("usuarios");
  
      const email = req.params.email;
      const resultado = await userCollection.deleteOne({ email });
  
      if (resultado.deletedCount > 0) {
        console.log(`🗑 Usuário com e-mail ${email} foi deletado com sucesso!`);
        res.status(200).json({ message: "✅ Usuário deletado com sucesso" });
      } else {
        console.log(`⚠ Nenhum usuário encontrado com o e-mail ${email}.`);
        res.status(404).json({ message: "❌ Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({ message: "❌ Erro ao deletar usuário" });
    }
  });

export default router;