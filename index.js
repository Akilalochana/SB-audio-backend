import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";

dotenv.config();

let app = express()

app.use(bodyParser.json());//kiywgnn beri jason tika lassna krnw



let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)//mongo url ekk connect wenn kiynwa

let connection = mongoose.connection

//kohom hri connect unoth
connection.once("open", ()=>{
    console.log("mongoDB connection successfully!")
})


app.use("/api/users",userRouter)

app.listen(3000,()=>{
    console.log("server is running on prot 3000")
});