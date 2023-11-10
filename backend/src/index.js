const { PrismaClient } = require('@prisma/client')
const express = require("express");
const dotenv = require("dotenv");
const prisma = new PrismaClient()

const app = express();
dotenv.config()
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    hello: "world",
  });
});

app.get('/api',(req,res)=>{
  res.send("hello world")
})
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
}); 
