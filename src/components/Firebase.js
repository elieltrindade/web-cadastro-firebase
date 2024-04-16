import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBroKH9CEk5eh7bQsFluZAJaC2h9TXymdg",
    authDomain: "projetocadastroreact.firebaseapp.com",
    projectId: "projetocadastroreact",
    storageBucket: "projetocadastroreact.appspot.com",
    messagingSenderId: "412717300603",
    appId: "1:412717300603:web:59185a9a9addb9b694dbde"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;