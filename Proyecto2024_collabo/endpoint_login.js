import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'express-openid-connect';
import bodyParser from 'body-parser'; 

dotenv.config();
const { auth, requiresAuth } = pkg;
const app = express();
const PORT= 8001;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
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
  //login  
  app.post('/login', (req, res) => {
    if (req.oidc.isAuthenticated()) {
      res.send('Login successful');
    } else {
      res.status(401).send('Unauthorized');
    }
  });
  //logout
  app.get('/logout', (req, res) => {
    res.oidc.logout({ returnTo: process.env.BASEURL });
  });
  // Ruta de registro
  app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
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