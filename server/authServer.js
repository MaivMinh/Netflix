const express = require('express')
require("dotenv").config();
const app = express();
const port = process.env.PORT_AUTH_SERVER || 8080;


app.get('/auth/create', (req, res) => res.send('Account is created!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))