import express from 'express';
import multer from 'multer';
import busboy from "busboy";
import cors from 'cors';

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: 'sdw26qdtlf',
  api_key: '646641215983919',
  api_secret: process.env.CLOUDINARY_API_KEY,
  secure: true,
});

//import * as app from 'express';
const app = express();
const PORT= 8080;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors());
app.post ('/uploadloops',upload.single('audio'),(req,res)=>{
    console.log(req.body);
    const bb = busboy({ headers: req.headers })
    let accInfo=[]
    bb.on('file', (name, file, info) => {
      console.log(name);
      console.log(info);
      //const fileContent = file.read();
      const uploadStream = cloudinary.uploader.upload_stream({resource_type: "video", use_filename: true}, (err, result) => {
        if (err)
          return console.log(err);

        console.log(result);
       
      });//.end(fileContent);
      file.pipe(uploadStream);
    });
    bb.on('error', error => {
      console.log("bb error:", error)
      //res.status(500).json(error);
    });
    bb.on('close', () => {
      console.log(accInfo);
      res.writeHead(201, { Connection: 'close' }).json(accInfo);
    })
    bb.end(req.file)

})
app.listen(
    PORT,
    () => console.log('lol')
)