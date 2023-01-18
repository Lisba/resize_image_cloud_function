import { initializeApp } from 'firebase/app';
import envVars from './envVars.js';

const firebaseConfig: object = {
  apikey: envVars.apikey,
  authdomain: envVars.authdomain,
  projectid: envVars.projectid,
  storagebucket: envVars.storagebucket,
  messagingsenderid: envVars.messagingsenderid,
  appid: envVars.appid,
  measurementid: envVars.measurementid,
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
