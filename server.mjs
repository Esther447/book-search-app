import fetch from 'node-fetch';  // Use import instead of require
import express from 'express';

const app = express();
const port = 5000;

app.use(express.static('.'));

app.get('/search', async (req, res) => {
    const query = req.query.q;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    const books = data.items ? data.items.map(item => item.volumeInfo) : [];
    res.json(books);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

