const express = require("express");
const Client = require('bitcoin-core');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api", (req, res) =>{
    res.json({ message: "Hello from backend!"});
});


const client = new Client({ 
  network: 'regtest', 
  username: 'user', 
  password: 'pass', 
  port: 18443 
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});