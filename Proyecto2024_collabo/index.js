import {v2 as cloudinary} from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: "dw26qdtlf", 
        api_key: "646641215983919", 
        api_secret: "Rd41xA0LM8TA75-OLK7h5pqZxqY" 
    });
    try {
        const timestamp = Math.floor(Date.now() / 1000);
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
        public_id: "shoes"
    }).catch((error)=>{console.log(error)});
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url("shoes", {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url("shoes", {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();