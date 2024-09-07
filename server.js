const express = require('express');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();  
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let chatHistory = [];

app.get('/chat-history', (req, res) => {
  res.json(chatHistory);
});

app.post('/ask', (req, res) => {
  const prompt = req.body.prompt;
  const apiKey = process.env.OPENAI_API_KEY; 
  const pythonProcess = spawn('python', ['assistant.py', prompt, apiKey]);

  pythonProcess.stdout.on('data', (data) => {
    const response = JSON.parse(data.toString());
    chatHistory.push({ prompt, response: response.response });
    res.json({ response: response.response });
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
