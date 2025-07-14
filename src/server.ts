import express from 'express';
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendStatus(200);
    console.log('Home / hit', req.body);
});

app.listen(PORT, () => {
    console.log(`Server has started on: ${PORT}...`);
});
