import express from 'express';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pkg from 'express-openid-connect';
import bodyParser from 'body-parser'; 
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from "cloudinary";


const { auth, requiresAuth } = pkg;
const app = express();
const PORT= 8003;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const prisma = new PrismaClient();

app.use(cors());

app.use(bodyParser.json()); 

app.use(cookieParser());


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
  };
  
app.use(auth(config));

const jwtSecret = process.env.JWT_SECRET;

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

// login
app.post('/login', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
      return res.status(400).json({ error: 'Faltan datos en la solicitud' });
  }

  try {
      // Buscar usuario en la base de datos
      const user = await prisma.user.findUnique({
          where: { email },
      });

      if (!user) {
          return res.status(400).json({ error: 'Email o contraseña incorrectos' });
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
          return res.status(400).json({ error: 'Email o contraseña incorrectos' });
      }
      
      const token = jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });


      res.cookie('token', token, { httpOnly: true, secure: true });


      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  });

// logout
app.get('/logout', requiresAuth(), (req, res) => {
  req.logout();
  res.redirect('/');
});

//register
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }
  
    try {
      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Ya existe una cuenta con el mismo email' });
      }
  
      // Encriptar la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear usuario usando Prisma
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  });
  
 // Ruta para subir archivos
app.post('/uploadloops', upload.single('audio'), async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'No se proporcionó un token' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const userId = decoded.sub;

    const uploadStream = async () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "video", use_filename: true }, (err, result) => {
          if (err) {
            console.error('Error uploading to Cloudinary:', err);
            return reject(err);
          }
          resolve(result);
        }).end(req.file.buffer);
      });
    };

    const result = await uploadStream();

    try {
      const newLoop = await prisma.loops.create({
        data: {
          userId: userId,
          Title: req.body.title,
          Descripcion: req.body.descripcion,
          Tags: req.body.tags,
        },
      });

      res.status(201).json(result);
    } catch (error) {
      console.error('Error saving loop to database:', error);
      res.status(500).json({ error: 'Error al guardar el loop en la base de datos' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.get('/download/:public_id', (req, res) => {
  const publicId = req.params.public_id;
  const url = cloudinary.url(publicId, { resource_type: 'video' });
  res.redirect(url);
});
// Ruta para buscar loops por título
app.get('/searchloops', async (req, res) => {
  const { title } = req.query;

  try {
    const loops = await prisma.loops.findMany({
      where: {
        Title: title
      }
    });

    if (loops.length === 0) {
      return res.status(404).json({ error: 'No se encontró ningún loop con el título especificado' });
    }

    // Filtrar solo el primer resultado (suponiendo que esperas un solo resultado)
    const filteredLoop = loops[0];

    res.status(200).json(filteredLoop);
  } catch (error) {
    console.error('Error fetching loop:', error);
    res.status(500).json({ error: 'Error al buscar el loop en la base de datos' });
  }
});


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