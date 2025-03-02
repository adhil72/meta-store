import express from 'express';
import { Database } from './db.js';
import { readFileSync } from 'fs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const port = 50000;
const db = new Database("data");

app.get('/', (req, res) => {
    res.send(readFileSync('templates/index.html', 'utf-8'));
})

app.post('/save', (req, res) => {
    try {
        const { key, data } = req.body;
        db.save(key, data);
        res.send("Saved");
    } catch (error) {
        res.send("Error");
    }
})

app.post('/push', (req, res) => {
    try {
        const { key, data } = req.body;
        db.push(key, data);
        res.send("Pushed");
    } catch (error) {
        res.send("Error");
    }
})

app.post('/set', (req, res) => {
    try {
        const { key, data } = req.body;
        db.set(key, data);
        res.send("Set");
    } catch (error) {
        res.send("Error");
    }
})

app.get('/get', (req, res) => {
    try {
        const { key, f_key, f_value } = req.query;
        const data = db.get(key, f_key, f_value);
        res.send(data);
    } catch (error) {
        res.send("Error");
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});