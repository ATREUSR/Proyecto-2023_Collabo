// src/routes/api/signature.js
import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary 
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY,
  secure: true
});

export async function GET({ url }) {
  const public_id = url.searchParams.get('public_id');
  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = {
    timestamp: timestamp,
    public_id: public_id
  };

  const signature = cloudinary.utils.api_sign_request(paramsToSign, cloudinary.config().api_secret);

  return {
    status: 200,
    body: { timestamp, signature }
  };
}
