import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./database/dbConnection.js";

const app = express();
const port = process.env.PORT ?? 5000;
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// routes configuration .



app.use((error, req, res, next)=> {
  console.log(error.stack);
  res.stack(500).json({
    success: false,
    message:"Something went wrong!"
  })
})
app.listen(port,async () => {
 await connectDB();
  console.log(`Example app listening on port ${port}`);
});
