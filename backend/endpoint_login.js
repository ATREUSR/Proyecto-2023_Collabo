import dotenv from 'dotenv';
dotenv.config();
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




const corsOptions = {
  origin: ['https://proyecto-2024collabo-i52mapon0-atreus-rs-projects.vercel.app', 'https://proyecto2024collaboal.vercel.app', 'http://localhost:3000','http://localhost:8003', 'http://localhost:5173'],
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true, // Permitir el envío de cookies y otros credenciales
  optionsSuccessStatus: 204 // Algunos navegadores (Safari) fallan con 204
};


app.use(cors(corsOptions));


app.use(express.json());


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
  const { email, password } = req.body;


  if (!email || !password) {
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




      const isProduction = process.env.NODE_ENV === 'production';
      res.cookie('token', token, { httpOnly: true, secure: isProduction });




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
      console.log(error);
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
    const tagsArray = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : ["rock", "pop", "trap","rap"];



    try {
      const newLoop = await prisma.loops.create({
        data: {
          id: result.public_id,
          userId: userId,
          Title: req.file.originalname,
          Name: req.body.name,
          Descripcion: req.body.descripcion,
          Tags: tagsArray, 
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

app.get('/tags', async (req, res) => {
  try {
    const { tags } = req.query;

    if (!tags) {
      return res.status(400).json({ error: 'No se proporcionaron etiquetas para buscar' });
    }

    // Convierte las etiquetas en un array si se proporciona como cadena de texto
    const tagsArray = tags.split(',').map(tag => tag.trim());

    // Busca loops que contengan al menos una de las etiquetas
    const loops = await prisma.loops.findMany({
      where: {
        Tags: {
          hasSome: tagsArray,
        },
      },
    });

    if (loops.length === 0) {
      return res.status(404).json({ message: 'No se encontraron loops con las etiquetas especificadas' });
    }

    res.status(200).json(loops);
  } catch (error) {
    console.error('Error fetching loops by tags:', error);
    res.status(500).json({ error: 'Error al buscar loops por etiquetas' });
  }
});


app.post('/download', async (req, res) => {
  const { loopId } = req.body;
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


  try {
    const downloadRecord = await prisma.download.create({
      data: {
        userId: userId,
        loopId: loopId,
      },
    });


    const loop = await prisma.loops.findUnique({
      where: { id: loopId },
    });


    if (!loop) {
      return res.status(404).json({ error: 'Loop no encontrado' });
    }


    const url = cloudinary.url(loop.id, { resource_type: 'video' });
    res.redirect(url);
  } catch (error) {
    console.error('Error recording download:', error);
    res.status(500).json({ error: 'Error al registrar la descarga' });
  }
});


// Ruta para buscar loops por título
app.get('/searchloops2', async (req, res) => {
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
    //const filteredLoop = loops[0];


    //res.status(200).json(filteredLoop);
    res.status(200).json(loops)
  } catch (error) {
    console.error('Error fetching loop:', error);
    res.status(500).json({ error: 'Error al buscar el loop en la base de datos' });
  }
});
app.get('/artist-loops/:artistId', async (req, res) => {
  const { artistId } = req.params;


  try {
    const loops = await prisma.loops.findMany({
      where: {
        userId: parseInt(artistId),
      },
    });


    if (loops.length === 0) {
      return res.status(404).json({ error: 'No se encontraron loops para este artista' });
    }


    res.status(200).json(loops);
  } catch (error) {
    console.error('Error fetching artist loops:', error);
    res.status(500).json({ error: 'Error al buscar los loops del artista' });
  }
});
app.get('/loop-downloads/:loopId', async (req, res) => {
  const { loopId } = req.params;


  try {
    const downloads = await prisma.download.findMany({
      where: {
        loopId: loopId,
      },
      include: {
        user: true, // Incluye los detalles del usuario en el resultado
      },
    });


    if (downloads.length === 0) {
      return res.status(404).json({ error: 'No se encontraron descargas para este loop' });
    }


    // Extraer solo los datos de los usuarios
    const users = downloads.map(download => download.user);


    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching loop downloads:', error);
    res.status(500).json({ error: 'Error al buscar las descargas del loop' });
  }
});
app.get('/searchloops', async (req, res) => {
  const { title, artistName } = req.query;


  try {
    const loops = await prisma.loops.findMany({
      where: {
        OR: [
          {
            Title: {
              contains: title,
              mode: 'insensitive', // Para hacer la búsqueda insensible a mayúsculas y minúsculas
            },
          },
          {
            Name: {
              contains: artistName,
              mode: 'insensitive', // Búsqueda insensible a mayúsculas y minúsculas
            },
          },
        ],
      },
    });


    if (loops.length === 0) {
      return res.status(404).json({ error: 'No se encontraron loops con los criterios especificados' });
    }


    res.status(200).json(loops);
  } catch (error) {
    console.error('Error fetching loops:', error);
    res.status(500).json({ error: 'Error al buscar loops en la base de datos' });
  }
});
app.get('/randomloops', async (req, res) => {
  try {
    const loops = await prisma.$queryRaw`
      SELECT * FROM "Loops"
      ORDER BY RANDOM()
    `;


    if (loops.length === 0) {
      return res.status(404).json({ error: 'No se encontraron loops' });
    }


    res.status(200).json(loops);
  } catch (error) {
    console.error('Error fetching random loops:', error);
    res.status(500).json({ error: 'Error al obtener loops aleatorios de la base de datos' });
  }
});


app.get('/profile', async (req, res) => {
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

      const userId = decoded.sub; // Obtener el ID del usuario del token

      // Obtener información del usuario, sus descargas y loops
      const user = await prisma.user.findUnique({
          where: { id: userId },
          include: {
              loops: true,
              downloads: true, // Asegúrate de que estos modelos tengan la relación correcta
          },
      });

      if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Enviar la respuesta
      return res.json({
          name: user.name,
          downloads: user.downloads,
          loops: user.loops,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
  }
});



app.listen(
     PORT,
     () => {
       console.log(`Listening on port: ${PORT}`)
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
