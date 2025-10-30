// ----------------------
// Configuração Supabase
// ----------------------
const supabaseUrl = 'https://qkbknjelwntrhhvqeuko.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrYmtuamVsd250cmhodnFldWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NDQyMDksImV4cCI6MjA3NzQyMDIwOX0.hiGQJp50YPW4_HnU8w91i2HSzTlk5wUVMlV7uOlWnQw';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// ----------------------
// URLs públicas do Codespace
// ----------------------
const INDEX_URL = 'https://sinister-corpse-gx5pqrj6gxwcw6xj-5502.app.github.dev/index.html';
const REGISTER_URL = 'https://sinister-corpse-gx5pqrj6gxwcw6xj-5502.app.github.dev/src/html/register.html';
const FORGOT_URL = 'https://sinister-corpse-gx5pqrj6gxwcw6xj-5502.app.github.dev/src/html/forget_password.html';
const RESET_URL = 'https://sinister-corpse-gx5pqrj6gxwcw6xj-5502.app.github.dev/src/html/reset_password.html';
const DASHBOARD_URL = 'https://sinister-corpse-gx5pqrj6gxwcw6xj-5502.app.github.dev/src/admin/dashboard.html';

// ----------------------
// REGISTER
// ----------------------
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    const { data, error } = await supabaseClient.auth.signUp({ email, password });

    if (error) alert('❌ ' + error.message);
    else {
      alert('✅ Registration successful! Check your email to verify.');
      window.location.href = INDEX_URL;
    }
  });
}

// ----------------------
// LOGIN + REMEMBER ME
// ----------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {

  const savedEmail = localStorage.getItem('rememberedEmail');
  if (savedEmail) {
    loginForm.email.value = savedEmail;
    if (loginForm.remember) loginForm.remember.checked = true;
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const remember = loginForm.remember ? loginForm.remember.checked : false;

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) alert('❌ ' + error.message);
    else {
      if (remember) localStorage.setItem('rememberedEmail', email);
      else localStorage.removeItem('rememberedEmail');

      alert('💖 Login successful!');
      window.location.href = DASHBOARD_URL;
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
      redirectTo: RESET_URL,
    });

    if (error) alert('❌ ' + error.message);
    else alert('📧 Reset link sent! Check your email.');
  });
}

// ----------------------
// RESET PASSWORD
// ----------------------
const resetForm = document.getElementById('resetForm');
if (resetForm) {
  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;

    const { data, error } = await supabaseClient.auth.updateUser({ password: newPassword });

    if (error) alert('❌ ' + error.message);
    else {
      alert('✅ Password updated successfully!');
      window.location.href = INDEX_URL;
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
    window.location.href = INDEX_URL;
  });
}
