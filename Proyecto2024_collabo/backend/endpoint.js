import express from 'express';
import multer from 'multer';
import cors from 'cors';
 import { PrismaClient } from '@prisma/client';
import { auth } from 'express-openid-connect';

 import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT= 8081;
const storage = multer.memoryStorage();
 const upload = multer({ storage: storage });
 const prisma = new PrismaClient();

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET,
//   baseURL: process.env.BASEURL,
//   clientID: process.env.CLIENTID,
//   issuerBaseURL: process.env.ISSUER,
// };
 app.use(cors());

 app.post ('/uploadloops',upload.single('audio'),(req,res)=>{
     console.log(req.body);
      let accInfo=[]
     const uploadStream = cloudinary.uploader.upload_stream({resource_type: "video", use_filename: true}, (err, result) => {
        if (err)
         return console.log(err);

       console.log(result);
        res.status(201).json(result);
      });
      uploadStream.end(req.file.buffer)
    
 })

// app.get('/download/:public_id', (req, res) => {
//   const publicId = req.params.public_id;
//   const url = cloudinary.url(publicId, { resource_type: 'video' });
//   res.redirect(url);
// });
app.listen(
     PORT,
     () => {
      console.log(process.env.CLOUDINARY_API_KEY)
       cloudinary.config({
         cloud_name: 'dw26qdtlf',
         api_key: '646641215983919',
         api_secret: process.env.CLOUDINARY_API_KEY,
         secure: true,
       });
       console.log('lol');
     }
 )