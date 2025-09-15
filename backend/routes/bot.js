import { WebSocketServer } from "ws";
import fetch from "node-fetch";

// Conexão WebSocket para comunicação do bot em tempo real
async function consultarChatIA(pergunta) {
  try {
    
    const API_KEY = process.env.OPENROUTER_API_KEY;
  
    const resposta = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content:
                "Você é um especialista em aves. Responda somente perguntas sobre pássaros: espécies, ficha de nascimento ou cuidados gerais. Se a pergunta **não tiver relação com pássaros**, diga: *Desculpe, só posso responder perguntas sobre pássaros. Identifique corretamente pássaros populares como joão-de-barro, sabiá, papagaio, canário, beija-flor, entre outros comuns no Brasil.*",
            },
            {
              role: "user",
              content: pergunta,
            },
          ],
        }),
      }
    );

    const data = await resposta.json();
    return data.choices?.[0]?.message?.content ||
      "❌ A IA não retornou resposta válida."
    
  } catch (error) {
    console.error("❌ Erro ao consultar a IA:", error);
    return "❌ Erro ao consultar a IA.";
  }
}

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Novo Cliente conectado");

    ws.on("message", async (message) => {
      console.log("Mensagem recebida:", message);

      const resposta = await consultarChatIA(message.toString());
      ws.send(resposta);
    });

    ws.send("Bem-vindo ao chat!");
  });

  console.log("Servidor Websocket rodando junto com HTTP");

}

