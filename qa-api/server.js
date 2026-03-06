const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Array em memória com as perguntas
const questions = [
  {
    id: 1,
    question: "Qual protocolo é usado para a web?",
    options: ["FTP", "HTTP", "SMTP", "SSH"],
    correctIndex: 1
  },
  {
    id: 2,
    question: "Qual linguagem roda no navegador?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctIndex: 2
  }
];

// ENDPOINT 1
// Retorna a pergunta pelo ID (sem mostrar a resposta correta)
app.get("/questions/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const question = questions.find(q => q.id === id);

  if (!question) {
    return res.status(404).json({ error: "Pergunta não encontrada" });
  }

  res.json({
    id: question.id,
    question: question.question,
    options: question.options
  });
});


// ENDPOINT 2
// Recebe a resposta do usuário
app.post("/answers", (req, res) => {

  const { id, answer } = req.body;

  const question = questions.find(q => q.id === id);

  if (!question) {
    return res.status(404).json({ error: "Pergunta não encontrada" });
  }

  if (answer === question.correctIndex) {
    return res.json({ result: "certo" });
  }

  res.json({ result: "errado" });

});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
