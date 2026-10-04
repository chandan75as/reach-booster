// Firebase SDKs Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Aapki Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFpOWJlCYTvlhVijnyOPeVn0wCw7Ev5tI",
    authDomain: "my-cozy-farm.firebaseapp.com",
    databaseURL: "https://my-cozy-farm-default-rtdb.firebaseio.com",
    projectId: "my-cozy-farm",
    storageBucket: "my-cozy-farm.firebasestorage.app",
    messagingSenderId: "680824081334",
    appId: "1:680824081334:web:535cdcb9acdf2fda2d4f17",
    measurementId: "G-LJQXPB6ERL"
};

try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app);
    console.log("SYSTEM BOOT: Firebase initialized successfully.");

    // PERSISTENT LOGIN CHECK
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Active user detected. Redirecting to dashboard...");
            window.location.href = "home.html";
        }
    });

    // ==========================================
    // SIGNUP LOGIC
    // ==========================================
    window.processSignup = function(event) {
        event.preventDefault();
        console.log("Signup process initiated...");
        
        const isChecked = document.getElementById('agreeCheckbox').checked;
        if(!isChecked) {
            alert("ERROR: System Warnings accept karna zaroori hai!");
            return false;
        }

        const fullName = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const mobile = document.getElementById('regMobile').value;
        const password = document.getElementById('regPass').value;

        // Firebase Authentication (Create Account)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("AUTH SUCCESS! User ID:", user.uid);
                
                // Database mein extra details save karna
                set(ref(database, 'users/' + user.uid), {
                    fullName: fullName,
                    email: email,
                    mobile: mobile,
                    accountStatus: "Active",
                    walletBalance: 0, 
                    joinDate: new Date().toISOString()
                })
                .then(() => {
                    console.log("DATABASE WRITE SUCCESS!");
                    alert("ACCOUNT CREATED SUCCESSFULLY! Redirecting...");
                    window.location.href = "home.html"; 
                })
                .catch((dbError) => {
                    console.error("DATABASE ERROR:", dbError);
                    alert("Account ban gaya, par Database me save nahi hua. Error: " + dbError.message + "\n\n(Bhai, Firebase ke Database Rules check karo, wo shayad 'false' par locked hain)");
                });
            })
            .catch((authError) => {
                console.error("AUTH ERROR:", authError);
                alert("SIGNUP FAILED: " + authError.message);
            });
    };

    // ==========================================
    // LOGIN LOGIC
    // ==========================================
    window.processLogin = function(event) {
        event.preventDefault();
        console.log("Login process initiated...");

        const email = document.getElementById('logEmail').value;
        const password = document.getElementById('logPass').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("LOGIN SUCCESS!");
                window.location.href = "home.html"; 
            })
            .catch((error) => {
                console.error("LOGIN ERROR:", error);
                alert("ACCESS DENIED: " + error.message);
            });
    };

} catch (error) {
    console.error("CRITICAL ERROR: Firebase connect nahi ho pa raha hai.", error);
    alert("CRITICAL ERROR: Code load nahi hua. Right-click karke 'Inspect' -> 'Console' check karo.");
}
