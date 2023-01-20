import * as functions from 'firebase-functions';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import express from 'express';
import formidable from 'formidable';
import fs from 'fs';
import { firebase, firebaseConfig } from './firebase.js';

const PORT = 3000;
const app = express();

app.get('/', (_req, res) => {
  res.send('GET from firebase functions!');
});

app.post('/image', (req, res, next) => {
  const form = formidable({ uploadDir: './uploads', keepExtensions: true });

  form.parse(req, (err, _fields, files) => {
    if (err) {
      throw err;
    }

    const imageData = {
      filepath: files[Object.keys(files)[0]]['filepath'],
      mimetype: files[Object.keys(files)[0]]['mimetype'],
      originalName: files[Object.keys(files)[0]]['originalFilename'],
    };

    fs.readFile(imageData?.filepath, function (err, data) {
      if (err) {
        throw err;
      }

      const storage = getStorage(firebase, firebaseConfig?.['storagebucket']);
      const storageRef = ref(storage, `images/${imageData?.originalName}`);
      const metadata = {
        contentType: imageData?.mimetype,
        name: imageData?.originalName,
      };
      uploadBytes(storageRef, data, metadata).then(() => {
        getDownloadURL(storageRef).then((url) => res.json(url));
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export const thumbnail_generator_api = functions.https.onRequest(app);
