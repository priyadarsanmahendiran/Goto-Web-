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
                db.ref('users/' + userId + '/Budget').set({
                    Amount: bud1
                }).then(alert("Budget Added!")).catch(function(error) {
                    alert(error.message);
                });
                db.ref('users/' + userId + '/Balance').set({
                    Amount: bud1
                }).then(alert("Balance Added!")).catch(function(error) {
                    alert(error.message);
                });
            });
            incbtn.addEventListener("click", function() {
                var inc1 = Number(inc.value);
                var db = firebase.database();
                db.ref('users/' + userId + '/Budget/Amount').on("value", function(snapshot) {
                    var data = snapshot.val();
                    var data1 = Number(data);
                    var add = data1 + inc1;
                    window.localStorage.setItem("addamt", add);
                });
                var add1 = window.localStorage.getItem("addamt");
                db.ref('users/' + userId + '/Budget').set({
                    Amount: add1
                }).then(alert("Budget Updated!")).catch(function(error) {
                    alert(error.message);
                });
                db.ref('users/' + userId + '/Balance/Amount').on("value", function(snapshot) {
                    var data = snapshot.val();
                    var data1 = Number(data);
                    var addb = data1 + inc1;
                    window.localStorage.setItem("addbal", addb);
                });
                var addb1 = window.localStorage.getItem("addbal");
                db.ref('users/' + userId + '/Balance').set({
                    Amount: addb1
                }).then(alert("Balance Updated!")).catch(function(error) {
                    alert(error.message);
                });
            });
            logout.addEventListener("click", function() {
                firebase.auth().signOut();
                alert("Logged Out!");
                window.location = "index.html";
            });
        }
    });
})();