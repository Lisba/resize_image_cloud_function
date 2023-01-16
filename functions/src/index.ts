import * as functions from 'firebase-functions';
import express from 'express';
import resize from './resize';

const PORT = 3000;
const app = express();

app.get('/', (_req, res) => {
  res.send('GET from firebase functions!');
});

app.post('/', (req, res) => {
  const response = {
    ...req?.body,
    somethin_else: 'something else added',
  };
  res.json(response);
});

app.post('/image', (req, res) => {
  const widthString = req.query.width;
  const heightString = req.query.height;
  const format = req.query.format;

  let width: number = 100;
  let height: number = 100;
  if (widthString) {
    width = parseInt(widthString as string);
  }
  if (heightString) {
    height = parseInt(heightString as string);
  }
  res.type(`image/${format || 'png'}`);
  resize('nodejs.png', format, width, height).pipe(res);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export const thumnail_generator_api = functions.https.onRequest(app);
