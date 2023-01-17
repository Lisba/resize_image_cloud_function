import { initializeApp } from 'firebase/app';

const firebaseConfig: object = {
  apikey: '',
  authdomain: '',
  projectid: '',
  storagebucket: '',
  messagingsenderid: '',
  appid: '',
  measurementid: '',
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
