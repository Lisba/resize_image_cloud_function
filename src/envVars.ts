import * as dotenv from 'dotenv';

dotenv.config();

const envVars = {
  port: parseInt(process.env.PORT as string),
  apikey: process.env.FIREBASE_APP_APIKEY,
  authdomain: process.env.FIREBASE_APP_AUTHDOMAIN,
  projectid: process.env.FIREBASE_APP_PROJECTID,
  storagebucket: process.env.FIREBASE_APP_STORAGEBUCKET,
  messagingsenderid: process.env.FIREBASE_APP_MESSAGINGSENDERID,
  appid: process.env.FIREBASE_APP_APPID,
  measurementid: process.env.FIREBASE_APP_MEASUREMENTID,
};

export default envVars;
