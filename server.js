import express from "express";
import mongoose from "mongoose";
import upload from "./utils/multer.js";
import dotenv from "dotenv"
dotenv.config()
import cloudinary from './config/clouddb.js'
import { dbConnect } from "./config/db.js"

const app = express();


//schema
const fileSchema = new mongoose.Schema({
    filename: String,
    public_id: String,
    imgUrl: String,
});
const File = mongoose.model("Cloudinary", fileSchema);

app.use(express.json());


app.post("/upload", upload.single("file"), async (req, res) => {
   

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);

        const newFile = await File.create({
            filename: req.file.originalname,
            public_id: cloudinaryResponse.public_id,
            imgUrl: cloudinaryResponse.secure_url,
        });

        res.status(201).json({success:true,data:newFile});
    } catch (err) {
      return res.status(500).json({message:err.message})
    }
});


app.listen(process.env.PORT, () => {
  console.log(`server running ${process.env.PORT}`)
  dbConnect()
})

