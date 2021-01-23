const express = require('express');
require('dotenv').config();
const router = require('./routes');

const app = express();
app.use(express.json());
app.use(router);

const port = process.env.PORT

app.listen(port, () => {
  console.log(`SERVER IS UP ON PORT ${port}`);
})
