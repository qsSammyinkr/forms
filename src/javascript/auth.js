// ----------------------
// Configuração Supabase
// ----------------------
const supabaseUrl = 'SUA_SUPABASE_URL';
const supabaseKey = 'SUA_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ----------------------
// Register
// ----------------------
const registerForm = document.getElementById('registerForm');
if(registerForm){
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = registerForm.email.value;
        const password = registerForm.password.value;

        const { user, error } = await supabase.auth.signUp({ email, password });
        if(error) alert(error.message);
        else {
            alert("User registered! Check your email to confirm.");
            window.location.href = "index.html";
        }
    });
}

// ----------------------
// Login + Remember Me
// ----------------------
const loginForm = document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        const { session, error } = await supabase.auth.signIn({ email, password });
        if(error) alert(error.message);
        else {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        }
    });
}

// ----------------------
// Forgot Password
// ----------------------
const forgotForm = document.getElementById('forgotForm');
if(forgotForm){
    forgotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = forgotForm.email.value;

        const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
        if(error) alert(error.message);
        else alert("Reset link sent to your email!");
    });
}

// ----------------------
// Logout
// ----------------------
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
    logoutBtn.addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = "index.html";
    });
}
