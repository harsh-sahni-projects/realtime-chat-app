const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json())

app.post('/create-user', (req, res) => {
  console.log(req.body)
  res.send('api working');
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});