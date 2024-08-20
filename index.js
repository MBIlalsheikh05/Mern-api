const express = require('express')
const app= express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require("path");
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')

require('dotenv').config();
require('./Models/db');

const port = process.env.PORT || 3002; // Use a different port like 3001

app.get('/ping', (req, res) => {
    res.send('S')
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products ', ProductRouter);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});





// const PORT= process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`Server is running ${PORT}`);
// })
