import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import config from './config';


const firebaseConfig = config();

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;