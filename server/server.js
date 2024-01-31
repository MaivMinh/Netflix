const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/v1/account', (req, res) => {
  res.send([
    {
      id: 1,
      name: "minh",
    },
    {
      id: 2,
      name: "tuan"
    }
  ])
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))