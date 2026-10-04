// Firebase ke zaroori modules import kar rahe hain (CDN se)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

// Firebase Initialize karna
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ==========================================
// SIGNUP LOGIC (Database mein data save karna)
// ==========================================
window.handleSignupAuth = async function(event) {
    event.preventDefault(); // Page refresh rokne ke liye

    // Checkbox validation
    if(!document.getElementById('agreeCheckbox').checked) {
        alert("ERROR: System Warnings accept karna zaroori hai!");
        return;
    }

    // HTML se values uthana
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const mobile = document.getElementById('signupMobile').value;
    const password = document.getElementById('signupPassword').value;

    try {
        // 1. Firebase Auth mein account banana
        const userCredential = await createUserWithEmailAndPassword(**`brain.js`** file ko create karein aur usme ye Firebase v9 (Modular SDK) ka code paste karein. Ye code naye users ka data Firebase Authentication mein register karega aur unka naam/mobile number Realtime Database mein save karega.

```javascript
// Firebase SDKs Import kar rahe hain
import { initializeApp } from "[https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js](https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js)";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "[https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js](https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js)";
import { getDatabase, ref, set, get, child } from "[https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js](https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js)";

// Aapka Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFpOWJlCYTvlhVijnyOPeVn0wCw7Ev5tI",
  authDomain: "my-cozy-farm.firebaseapp.com",
  databaseURL: "[https://my-cozy-farm-default-rtdb.firebaseio.com](https://my-cozy-farm-default-rtdb.firebaseio.com)",
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

// Global scope mein function daal rahe hain taaki HTML isko call kar sake
window.processSignup = function(event) {
    event.preventDefault();
    
    // Safety check verification
    const isChecked = document.getElementById('agreeCheckbox').checked;
    if(!isChecked) {
        alert("ERROR: System Warnings and Risks ko accept karna zaroori hai!");
        return false;
    }

    // Form inputs se data nikalna
    const fullName = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const mobile = document.getElementById('regMobile').value;
    const password = document.getElementById('regPass').value;

    alert("System Processing... Please wait.");

    // Firebase Authentication (Email/Password)
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Database mein Extra user details save karna
            set(ref(database, 'users/' + user.uid), {
                fullName: fullName,
                email: email,
                mobile: mobile,
                accountStatus: "Active",
                walletBalance: 0, 
                joinDate: new Date().toISOString()
            })
            .then(() => {
                alert("SYSTEM NODE CREATED SUCCESSFULLY! Welcome to Reach Buster.");
                document.getElementById('signupFormContent').reset();
                switchTab('login'); // Wapas login tab par bhej dega
            })
            .catch((error) => {
                alert("DATABASE ERROR: " + error.message);
            });
        })
        .catch((error) => {
            alert("SIGNUP FAILED: " + error.message);
        });
};

window.processLogin = function(event) {
    event.preventDefault();

    const emailOrPhone = document.getElementById('logEmail').value;
    const password = document.getElementById('logPass').value;

    // Firebase mainly email se login karta hai. 
    signInWithEmailAndPassword(auth, emailOrPhone, password)
        .then((userCredential) => {
            alert("ACCESS GRANTED! Welcome back.");
            // Login success hone ke baad dashboard par redirect karne ke liye:
            // window.location.href = "dashboard.html"; 
        })
        .catch((error) => {
            alert("ACCESS DENIED: Invalid Email or Password.");
        });
};
