const { KindeClient, GrantType } = require("@kinde-oss/kinde-nodejs-sdk");
const express = require('express');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const cluster=require("cluster");
const os=require("os").cpus().length;
const path = require('path');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



const options = {
	domain: process.env.KINDE_DOMAIN,
	clientId: process.env.KINDE_CLIENT_ID,
	clientSecret: process.env.KINDE_CLIENT_SECRET,
	redirectUri: process.env.KINDE_REDIRECT_URI,
	logoutRedirectUri: process.env.KINDE_LOGOUT_REDIRECT_URI,
	grantType: GrantType.PKCE
};

const kindeClient = new KindeClient(options); 

let chatHistory = [];


if(cluster.isMaster){
  for (let i = 0; i < os; i++) {
    cluster.fork();
  }
}
else{

  app.get('/chat-history', (req, res) => {
    res.json(chatHistory);
  });
  
  
  app.get('/login', kindeClient.login(), (req, res) => {
    return res.redirect("/");
  });
  
  
  app.get('/register', kindeClient.register(), (req, res) => {
    return res.redirect("/");
  });
  
  
  app.get('/callback', kindeClient.callback(), (req, res) => {
    return res.redirect("/");
  });
  
  app.get("/logout", kindeClient.logout());
  
  
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
}
