import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'express-openid-connect';
import bodyParser from 'body-parser'; 
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

dotenv.config();
const { auth, requiresAuth } = pkg;
const app = express();
const PORT= 8002;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
const prisma = new PrismaClient();
app.use(bodyParser.json()); 


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
  };
  
app.use(auth(config));

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

      // Aquí puedes generar un token JWT o iniciar una sesión
      res.status(200).json({ message: 'Login successful' });
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
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });