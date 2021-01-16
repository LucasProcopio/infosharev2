const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT

app.get('/main', (req, res) => {
  return  res.json({ message: 'ok' })
})

app.listen(port, () => {
  console.log(`SERVER IS UP ON PORT ${port}`);
})
