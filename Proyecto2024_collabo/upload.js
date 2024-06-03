import express from 'express';
import busboy from 'busboy';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Configuración de Cloudinary
cloudinary.config({ 
  cloud_name: 'sdw26qdtlf', 
  api_key: '646641215983919',
  api_secret: 'Rd41xA0LM8TA75-OLK7h5pqZxqY',
  secure: true
});

// Endpoint para la carga de archivos de audio
router.post('/upload/audio', (req, res) => {
    const bb = busboy({ headers: req.headers });
    let uploadStream;

    bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype.startsWith('audio/')) {
            uploadStream = cloudinary.uploader.upload_stream({ resource_type: "video" }, (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    return res.status(500).json({ success: false, message: 'Error uploading to Cloudinary' });
                }
                res.status(200).json({ success: true, url: result.secure_url });
            });
            file.pipe(uploadStream);
        } else {
            file.resume();
            return res.status(400).json({ success: false, message: 'Invalid file type. Only audio files are allowed.' });
        }
    });

    bb.on('finish', () => {
        console.log('Upload complete');
    });

    bb.on('error', (error) => {
        console.error('Busboy error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    });

    req.pipe(bb);
});

export default router;