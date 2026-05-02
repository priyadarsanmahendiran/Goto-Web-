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
    const password = document.getElementById('pword');
    const regbtn = document.getElementById('registerbtn');
    regbtn.addEventListener('click', function() {
        const emailid = email.value;
        const pass = password.value;
        var auth = firebase.auth().createUserWithEmailAndPassword(emailid, pass).then(function() {
            showSnackbar("Account created! Welcome.", "success");
            setTimeout(function() { window.location = "login.html"; }, 1500);
        }).catch(function(error) {
            console.log(error);
            showSnackbar('Registration failed: ' + error.message, 'error');
        });
    });
})();
