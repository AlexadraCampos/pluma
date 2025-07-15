import { WebSocketServer } from "ws";
import fetch from "node-fetch";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Novo Cliente conectado");

  ws.on("message", async (message) => {
    console.log("Mensagem recebida:", message);

    const resposta = await consultarChatIA(message.toString());
    console.log("Resposta enviada para o frontend:", resposta);
    ws.send(resposta);
  });

  ws.send("Bem-vindo ao chat!");
});

console.log("Servidor WebSocket rodando na porta 8080");

async function consultarChatIA(pergunta) {
  try {
    const resposta = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: "Você é um especialista em aves. Responda somente perguntas sobre pássaros: espécies, ficha de nascimento ou cuidados gerais.  Se a pergunta **não tiver relação com pássaros**, diga: *Desculpe, só posso responder perguntas sobre pássaros. Identifique corretamente pássaros populares como joão-de-barro, sabiá, papagaio, canário, beija-flor, entre outros comuns no Brasil.*"
          },
          {
            role: "user",
            content: pergunta
          }
        ]
      })
    });

    const data = await resposta.json();
    console.log("💬 Resposta bruta da API:", JSON.stringify(data, null, 2)); 

    return data.choices?.[0]?.message?.content || "❌ A IA não retornou resposta válida.";
  } catch (error) {
    console.error("❌ Erro ao consultar a IA:", error);
    return "❌ Erro ao consultar a IA.";
  }
}
