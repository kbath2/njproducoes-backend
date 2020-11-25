import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({ message: 'NJ Produções' })
})

app.listen(3333, () => {
  console.log('✔️ Server started on port 3333!')
})
