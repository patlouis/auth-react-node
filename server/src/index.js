import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/api', (req, res) => {
  res.json({ message: 'API is working!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});