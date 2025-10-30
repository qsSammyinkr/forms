// ----------------------
// Configuração Firebase
// ----------------------
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// ----------------------
// Função Register
// ----------------------
const registerForm = document.getElementById('registerForm');
if(registerForm){
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert("User registered successfully!");
                window.location.href = "index.html";
            })
            .catch((error) => alert(error.message));
    });
}

// ----------------------
// Função Login + Remember Me
// ----------------------
const loginForm = document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const persistence = loginForm.remember.checked 
            ? firebase.auth.Auth.Persistence.LOCAL 
            : firebase.auth.Auth.Persistence.SESSION;
        firebase.auth().setPersistence(persistence)
            .then(() => firebase.auth().signInWithEmailAndPassword(email, password))
            .then(() => window.location.href = "dashboard.html")
            .catch((error) => alert(error.message));
    });
}

// ----------------------
// Função Forgot Password
// ----------------------
const forgotForm = document.getElementById('forgotForm');
if(forgotForm){
    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = forgotForm.email.value;
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => alert("Reset link sent to your email!"))
            .catch((error) => alert(error.message));
    });
}

// ----------------------
// Logout
// ----------------------
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
    logoutBtn.addEventListener('click', () => {
        firebase.auth().signOut().then(() => window.location.href="index.html");
    });
}
