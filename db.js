  var firebaseConfig = {
      apiKey: "AIzaSyBC4V7G1ULhAD-FmkdkhPi5zzolp27Xijs",
      authDomain: "coffeefm-c328e.firebaseapp.com",
      databaseURL: "https://coffeefm-c328e.firebaseio.com",
      projectId: "coffeefm-c328e",
      storageBucket: "coffeefm-c328e.appspot.com",
      messagingSenderId: "594093084707",
      appId: "1:594093084707:web:a8bf4e3c45765084",
      measurementId: "G-QRK253F97J"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();