import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import express from 'express';
import formidable from 'formidable';
import fs from 'fs';
import firebase from './firebase.js';
import resize from './resize.js';
import envVars from './envVars.js';

const app = express();
const PORT = envVars.port;
const bucket = envVars?.storagebucket;
const childRef = 'images/';

app.get('/', (_req, res) => {
  res.send('GET from firebase functions!');
});

app.post('/image', (req, res) => {
  try {
    const form = formidable({ uploadDir: './uploads', keepExtensions: true });

    form.parse(req, async (err, _fields, files) => {
      if (err) {
        console.error(err);
        throw err;
      }

      const imageData = {
        filepath: files[Object.keys(files)[0]]?.['filepath'],
        mimetype: files[Object.keys(files)[0]]?.['mimetype'],
        originalName: files[Object.keys(files)[0]]?.['originalFilename'],
      };

      await resize(imageData?.filepath, 120, 120, imageData?.originalName);

      const currentDirectory = new URL('../', import.meta.url);
      const thumbnailPath = `${currentDirectory?.pathname}${imageData?.originalName}`;

      fs.readFile(thumbnailPath, function (err, data) {
        if (err) {
          console.error(err);
          throw err;
        }

        const storage = getStorage(firebase, bucket);
        const storageRef = ref(storage, `${childRef}${imageData?.originalName}`);
        const metadata = {
          contentType: imageData?.mimetype,
          name: imageData?.originalName,
        };
        uploadBytes(storageRef, data, metadata).then(() => {
          getDownloadURL(storageRef).then((url) => res.json(url));
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something broke!');
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
