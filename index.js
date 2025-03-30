import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import productRouter from "./routes/productRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";
import cors from "cors";

dotenv.config();

let app = express()

app.use(cors());

app.use(bodyParser.json());//kiywgnn beri jason tika lassna krnw



let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)//mongo url ekk connect wenn kiynwa

let connection = mongoose.connection

//kohom hri connect unoth
connection.once("open", ()=>{
    console.log("mongoDB connection successfully!")
})


app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/inquiries", inquiryRouter);

app.listen(3000,()=>{
    console.log("server is running on prot 3000")
});