import express from 'express'; // importacion express
import cors from 'cors'; // importacion cors

import { getPosts, newPost } from './modules/queryss.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('http://localhost:5173');
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (invokeFuncError) {
    console.error(
      `There was an error invoking get posts function: ${invokeFuncError}` // error al invocar la función Get Posts
    );
    res.status(500).json({
      ok: false,
      error: invokeFuncError,
      msg: 'There was an error invoking get posts function', // error al invocar la función Get Posts
    });
  }
});

app.post('/posts', async (req, res) => {
  const { title, img, description, likes } = req.body;

  try {
    await newPost(title, img, description, likes);
    res.status(200).json({
      ok: true,
      msg: 'New post added', // Nueva publicación añadida
    });
  } catch (invokeFuncError) {
    console.error(
      `Error invoking new post function: ${invokeFuncError}` // Error al invocar la nueva función POST
    );
    res.status(500).json({
      ok: false,
      error: invokeFuncError,
      msg: 'Error invoking new post function', // Error al invocar la nueva función POST
    });
  }
});

app.listen(PORT, console.log(`Server running on port: ${PORT}`));
