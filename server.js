import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.get('/image', async (req, res) => {
  try {
    // URL de la imagen en Firebase Storage
    const imageUrl = 'URL_DE_TU_IMAGEN';

    // Realizar una solicitud a Firebase Storage para obtener la imagen
    const response = await fetch(imageUrl);
    const imageBuffer = await response.buffer();

    // Enviar la imagen como respuesta al cliente
    res.setHeader('Content-Type', 'image/png'); // Cambia 'image/png' según el tipo de imagen
    res.setHeader('Content-Disposition', 'attachment; filename="imagen.png"'); // Cambia 'imagen.png' al nombre deseado del archivo
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor intermedio escuchando en http://localhost:${PORT}`);
});
