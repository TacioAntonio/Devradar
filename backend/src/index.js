const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const routes = require('./routes.js');
const { setupWebsocket } = require('./websocket');

mongoose.connect('mongodb+srv://user:password@cluster0-ooq3a.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
