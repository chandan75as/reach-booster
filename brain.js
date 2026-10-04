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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// PERSISTENT LOGIN CHECK (Agar login hai toh sidha home par bhej dega)
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "home.html";
    }
});

// ==========================================
// SIGNUP LOGIC
// ==========================================
window.processSignup = function(event) {
    event.preventDefault();
    
    const isChecked = document.getElementById('agreeCheckbox').checked;
    if(!isChecked) {
        alert("ERROR: System Warnings accept karna zaroori hai!");
        return false;
    }

    const fullName = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const mobile = document.getElementById('regMobile').value;
    const password = document.getElementById('regPass').value;

    alert("System Processing... Please wait.");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
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
                alert("SYSTEM NODE CREATED! Redirecting to dashboard...");
                window.location.href = "home.html"; // Signup ke baad direct login ho jayega
            })
            .catch((error) => {
                alert("DATABASE ERROR: " + error.message);
            });
        })
        .catch((error) => {
            alert("SIGNUP FAILED: " + error.message);
        });
};

// ==========================================
// LOGIN LOGIC
// ==========================================
window.processLogin = function(event) {
    event.preventDefault();

    const email = document.getElementById('logEmail').value;
    const password = document.getElementById('logPass').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Success hone par direct home.html par bhej dega
            window.location.href = "home.html"; 
        })
        .catch((error) => {
            alert("ACCESS DENIED: Invalid Email or Password.");
        });
};
