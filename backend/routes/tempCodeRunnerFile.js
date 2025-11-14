router.get("/usuarios", async (req, res) => {
  
  console.log('passou aqui')
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