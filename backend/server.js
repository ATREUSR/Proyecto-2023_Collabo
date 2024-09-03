import express from 'express';
import uploadRouter from './upload.js'; 

const app = express();
const PORT = process.env.PORT || 3000;


app.use('/api', uploadRouter);

app.listen(PORT, () => {
  console.log (`Servidor corriendo en el puerto ${PORT}`);
});