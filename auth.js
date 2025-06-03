// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjmrP1BwKbZf7bFD9YW2MD_06lqHnqPrQ",
	authDomain: "forum-51d92.firebaseapp.com",
	projectId: "forum-51d92", // Utile, mais pas strictement nécessaire pour RTDB seule
	storageBucket: "forum-51d92.firebasestorage.app", // Pas nécessaire pour RTDB
	messagingSenderId: "860067871039", // Pas nécessaire pour RTDB
	appId: "1:860067871039:web:51228a907b8046e7b37b8a",
    databaseURL: "https://forum-51d92-default-rtdb.europe-west1.firebasedatabase.app/" // Souvent pas nécessaire si c'est la base par défaut
};


// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    //window.location.href = "login.html";
  } else {
    // L'utilisateur est connecté; vous pouvez gérer l'interface utilisateur pour cela
    console.log('Utilisateur connecté:', user);
    // Ajoutez ici la logique pour l'utilisateur connecté si nécessaire
  }
});