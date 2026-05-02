(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyBb01Cz4Fig4L70rMxO_4z0moitbzdRp34",
        authDomain: "personaldiary-719e9.firebaseapp.com",
        databaseURL: "https://personaldiary-719e9.firebaseio.com",
        projectId: "personaldiary-719e9",
        storageBucket: "personaldiary-719e9.appspot.com",
        messagingSenderId: "721824799231",
        appId: "1:721824799231:web:0b60bf8229aa37abfa2fca",
        measurementId: "G-6SGLL7W6G1"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const bud = document.getElementById('budget');
    const budbtn = document.getElementById('budgetbtn');
    const inc = document.getElementById('inc');
    const incbtn = document.getElementById('incrementbtn');
    const logout = document.getElementById('logoutbtn');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userId = user.uid;
            budbtn.addEventListener("click", function() {
                var bud1 = bud.value;
                var db = firebase.database();
                if (!bud1) {
                    showSnackbar("Please enter a valid amount.", "warning");
                    return;
                } else {
                    db.ref('users/' + userId + '/Budget').set({
                        Amount: Number(bud1)
                    }).then(function() { showSnackbar("Budget set!", "success"); }).catch(function(error) {
                        showSnackbar(error.message, "error");
                    });
                    db.ref('users/' + userId + '/Balance').set({
                        Amount: Number(bud1)
                    }).then(function() { showSnackbar("Balance added!", "success"); }).catch(function(error) {
                        showSnackbar(error.message, "error");
                    });
                }
            });
            incbtn.addEventListener("click", function() {
                var inc1 = Number(inc.value);
                var db = firebase.database();
                if (inc1 == 0) {
                    showSnackbar("Please enter a valid amount.", "warning");
                    return;
                } else {
                    db.ref('users/' + userId + '/Budget').once("value", function(snapshot) {
                        var data = snapshot.val();
                        var data1 = Number(data.Amount);
                        var add = data1 + inc1;
                        db.ref('users/' + userId + '/Budget').set({
                            Amount: Number(add)
                        }).then(function() {
                            showSnackbar("Budget updated!", "success");
                        }).catch(function(error) {
                            showSnackbar(error.message, "error");
                        });
                    });
                    db.ref('users/' + userId + '/Balance/Amount').once("value", function(snapshot) {
                        var data = snapshot.val();
                        var data1 = Number(data);
                        var addb = data1 + inc1;
                        db.ref('users/' + userId + '/Balance').set({
                            Amount: Number(addb)
                        }).then(function() { showSnackbar("Balance updated!", "success"); }).catch(function(error) {
                            showSnackbar(error.message, "error");
                        });
                    });
                }
            });
            logout.addEventListener("click", function() {
                firebase.auth().signOut();
                window.location = "login.html";
            });
        }
    });
})();
