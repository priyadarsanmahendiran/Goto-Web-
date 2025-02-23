(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyBb01Cz4Fig4L70rMxO_4z0moitbzdRp34",
        authDomain: "personaldiary-719e9.firebaseapp.com",
        databaseURL: "https://personaldiary-719e9.firebaseio.com",
        projectId: "personaldiary-719e9",
        storageBucket: "personaldiary-719e9.appspot.com",
        messagingSenderId: "721824799231",
        appId: "1:721824799231:web:bb9be92c7f327a6efa2fca",
        measurementId: "G-3CFQB0E5P3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const email = document.getElementById('username');
    const pword = document.getElementById('password');
    const login = document.getElementById('loginbtn');
    login.addEventListener('click', function() {
        const email1 = email.value;
        const pword1 = pword.value;
        firebase.auth().signInWithEmailAndPassword(email1, pword1).then(function() {
            window.location = "category.html";
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Error: ' + errorMessage);
        });
    });
})();