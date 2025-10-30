// ----------------------
// Configuração Supabase
// ----------------------
const supabaseUrl = 'https://qkbknjelwntrhhvqeuko.supabase.co';
const supabaseKey = '/3ENqm&4/w+3ph+'; // ⚠️ Coloque sua ANON PUBLIC KEY verdadeira aqui
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// ----------------------
// REGISTER
// ----------------------
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('✅ Registration successful! Please verify your email.');
      window.location.href = '/index.html';
    }
  });
}

// ----------------------
// LOGIN + REMEMBER ME
// ----------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('💖 Login successful!');
      window.location.href = 'src';
    }
  });
}

// ----------------------
// FORGOT PASSWORD
// ----------------------
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = forgotForm.email.value;

    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://qkbknjelwntrhhvqeuko.supabase.co/auth/v1/callback', // ou sua página de reset
    });

    if (error) {
      alert(error.message);
    } else {
      alert('📧 Reset link sent! Check your email.');
    }
  });
}

// ----------------------
// LOGOUT
// ----------------------
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    window.location.href = '/index.html';
  });
}
