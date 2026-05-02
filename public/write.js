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
    const diaryInput = document.getElementById('moments');
    const pic = document.getElementById('pictures');
    const vid = document.getElementById('videos');
    const db = firebase.database();
    const file = firebase.storage().ref();
    const dropbtn = document.getElementById('dropbtn');
    const fbtn1 = document.getElementById('filebtn1');
    const fbtn2 = document.getElementById('filebtn2');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const userId = user.uid;
            fbtn1.addEventListener("change", function(e) {
                var file = e.target.files[0];
                const mynewfile = new File([file], today + '.jpg', { type: file.type });
                console.log(mynewfile.name);
                var storageref = firebase.storage().ref(userId + '/' + mynewfile.name);
                storageref.put(file);
            });
            fbtn2.addEventListener("change", function(a) {
                var file1 = a.target.files[0];
                const mynewfile1 = new File([file1], today + '.mp4', { type: file1.type });
                var storageref1 = firebase.storage().ref(userId + '/' + mynewfile1.name);
                storageref1.put(file1).then(console.log("Success!")).catch(function(error) {
                    console.log(error.message);
                });
            });
            dropbtn.addEventListener('click', async function() {
                const entryText = diaryInput.value;
                if (!entryText) {
                    showSnackbar("Please write something first.", "warning");
                    return;
                } else {
                    const encrypted = await encryptEntry(entryText, userId);
                    firebase.database().ref('users/' + userId + '/Diary' + '/' + today).set({
                        mom: encrypted,
                    }).then(function() {
                        showSnackbar("Memory saved!", "success");
                        setTimeout(function() { window.location = "personal-diary.html"; }, 1500);
                    });
                }
            });
        }
    });
    const logoutbtn = document.getElementById('logoutbtn');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            logoutbtn.addEventListener("click", function() {
                firebase.auth().signOut();
                window.location = "login.html";
            });
        } else {
            console.log('Oops! Logged Out');
        }
    });
})();
