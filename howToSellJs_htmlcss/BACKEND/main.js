const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

const data = require('./data.json');


const _path = require("path");

app.get("/img/:path", (req, res) => {
    let path = req.params.path.replace(/_/g, "/")
    path = _path.resolve("howToSellJs_htmlcss/BACKEND/img/"+path+".jpg")
    res.status(200).sendFile(path)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'FRONTEND/index.html'));
});

app.get('/sneaker/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sneakers = data.sneakers;

    const sneaker = sneakers.find(s => s.id === id);
    if (!sneaker) {
        res.status(404).send('Sneaker not found');
    } else {
        res.status(200).json({
            message: "Sneaker is successfully found",
            name: sneaker.name
        });
    }
});

app.get('/sneakers', (req, res) => {
    const sneakers = data;
    if (!sneakers) {
        res.status(404).send('Sneaker not found');
    } else {
        res.status(200).json({
            sneakers
        });
    }
});

app.use(express.static(path.join(__dirname, '..')));

app.listen(port, () => console.log(`listening on port ${port}`));
