import * as functions from 'firebase-functions';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import express from 'express';
import formidable from 'formidable';
import fs from 'fs';
import firebase from './firebase.js';

const PORT = 3000;
const app = express();

app.get('/', (_req, res) => {
  res.send('GET from firebase functions!');
});

app.post('/image', (req, res, next) => {
  const form = formidable({ uploadDir: './uploads', keepExtensions: true });

  form.parse(req, (err, _fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const imageData = {
      filepath: files[Object.keys(files)[0]]['filepath'],
      size: files[Object.keys(files)[0]]['size'],
      mimetype: files[Object.keys(files)[0]]['mimetype'],
      originalName: files[Object.keys(files)[0]]['originalFilename'],
    };

    fs.readFile(imageData?.filepath, function (err, data) {
      if (err) {
        throw err;
      }

      const storage = getStorage(firebase, 'gs://thumbnail-generator-ui.appspot.com/');
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

// app.get('/api/upload', (req, res) => {
//   res.send(`
//     <h2>With <code>"express"</code> npm package</h2>
//     <form action="/api/upload" enctype="multipart/form-data" method="post">
//       <div>Text field title: <input type="text" name="title" /></div>
//       <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
//       <input type="submit" value="Upload" />
//     </form>
//   `);
// });

// app.post('/api/upload', (req, res, next) => {
//   const form = formidable({ uploadDir: './uploads', keepExtensions: true });

//   form.parse(req, (err, _fields, files) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     fs.readFile(files[Object.keys(files)[0]]['filepath'], function (err, data) {
//       if (err) {
//         throw err;
//       }
//       res.setHeader('Content-Type', 'image/jpg');
//       res.setHeader('Content-Length', `${files[Object.keys(files)[0]]['size']}`); // Image size here
//       res.send(data);
//     });
//   });
// });

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export const thumbnail_generator_api = functions.https.onRequest(app);
