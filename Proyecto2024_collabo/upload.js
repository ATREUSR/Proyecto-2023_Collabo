import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Configuración de Cloudinary
cloudinary.config({ 
  cloud_name: 'sdw26qdtlf', 
  api_key: '646641215983919',
  api_secret: 'Rd41xA0LM8TA75-OLK7h5pqZxqY',
  secure: true
});

// Configuración de Multer para manejar la carga de archivos de audio
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/audio', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No audio file uploaded.' });
        }

        const result = await cloudinary.uploader.upload(req.file.buffer, {
            resource_type: "video" 
        });

        res.status(200).json({ success: true, url: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

export default router;
