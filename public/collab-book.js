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
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    var i = 0;
    var j = 0;
    var k = 0;
    var flag = 1;
    const bookid = document.getElementById('bookid');
    const pword = document.getElementById('pword');
    const bookbtn = document.getElementById('booklogin');
    const bookjoin = document.getElementById('bookjoin');
    const bookcreate = document.getElementById('bookcreate');
    const refname = document.getElementById('refname');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '-' + '-' + mm + '-' + yyyy;
    bookbtn.addEventListener('click', function() {
        const b1 = bookid.value;
        const p1 = pword.value;
        const r1 = refname.value;
        const db = firebase.database();
        if (!b1 || !p1 || !r1) {
            showSnackbar("Please fill in all fields.", "warning");
            return;
        } else {
            db.ref('users/' + b1).on("value", function(snapshot) {
                var data = snapshot.val();
                for (i in data) {
                    if (p1 == i) {
                        db.ref('users/' + b1 + '/' + p1).on("value", function(snapshot) {
                            var data1 = snapshot.val();
                            console.log(data1);
                            for (j in data1) {
                                db.ref('users/' + b1 + '/' + p1 + '/' + j).on("value", function(snapshot) {
                                    var fam = snapshot.val();
                                    for (k in fam) {
                                        if (k == r1) {
                                            flag = 0;
                                            console.log('FLAG ' + flag);
                                            localStorage.setItem("b1", b1);
                                            localStorage.setItem("p1", p1);
                                            localStorage.setItem("r1", r1);
                                            window.location = "collabdisplay.html";
                                            break;
                                        } else {
                                            flag = 1;
                                        }
                                    }
                                    if (flag == 1) {
                                        showSnackbar("You are not a member. Join the book first.", "warning");
                                    }
                                });
                            }
                        });
                    } else if (p1 == " ") {
                        showSnackbar("Password is required.", "warning");
                    } else {
                        showSnackbar("Invalid password.", "error");
                        break;
                    }
                }
            });
        }

    });
    bookjoin.addEventListener('click', async function() {
        const b1 = bookid.value;
        const p1 = pword.value;
        const r1 = refname.value;
        const db = firebase.database();
        if (!b1 || !p1 || !r1) {
            showSnackbar("Please fill in all fields.", "warning");
            return;
        } else {
            db.ref("users/" + b1).on("value", async function(snapshot) {
                var data = snapshot.val();
                for (i in data) {
                    if (p1 == i) {
                        const encrypted = await encryptEntry("Hey I am new here!", b1 + p1);
                        db.ref("users/" + b1 + '/' + p1 + '/' + today + '/' + r1).set({
                            mom: encrypted
                        }).then(window.location = "collabdisplay.html").catch(function(error) {
                            console.log(error);
                        });
                    } else {
                        showSnackbar("Wrong book password.", "error");
                    }
                }
            });
        }
    });
    bookcreate.addEventListener("click", async function() {
        const b1 = bookid.value;
        const p1 = pword.value;
        const r1 = refname.value;
        const db = firebase.database();
        flag = 1;
        if (!b1 || !p1 || !r1) {
            showSnackbar("Please fill in all fields.", "warning");
            return;
        } else {
            db.ref("users/").on("value", function(snapshot) {
                var daa = snapshot.val();
                for (i in daa) {
                    console.log(i, b1);
                    if (i === b1) {
                        flag = 1;
                        break;
                    } else {
                        flag = 0;
                    }
                }
            });
            console.log(flag);
            if (flag === 0) {
                const encrypted = await encryptEntry("New Book up here!", b1 + p1);
                db.ref("users/" + b1 + '/' + p1 + '/' + today + '/' + r1).set({
                    mom: encrypted
                }).then(function() {
                    showSnackbar("Book created!", "success");
                    localStorage.setItem("b1", b1);
                    localStorage.setItem("p1", p1);
                    localStorage.setItem("r1", r1);
                    setTimeout(function() { window.location = "collabdisplay.html"; }, 1500);
                }).catch(function(error) {
                    console.log(error);
                });
            } else if (flag === 1) {
                showSnackbar("That Book ID is already taken. Try another.", "warning");
            }
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
