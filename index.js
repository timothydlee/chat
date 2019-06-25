const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const http = require('http').createServer(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

http.listen(PORT, () => {
    console.group(`Cosmic Messenger listening on port: ${PORT}`);
});