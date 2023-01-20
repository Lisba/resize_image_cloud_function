import { initializeApp } from 'firebase/app';

export const firebaseConfig: object = {
  apikey: '',
  authdomain: '',
  projectid: '',
  storagebucket: '',
  messagingsenderid: '',
  appid: '',
  measurementid: '',
};

export const firebase = initializeApp(firebaseConfig);
