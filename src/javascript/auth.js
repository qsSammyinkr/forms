// ----------------------
// Configuração Supabase
// ----------------------
const supabaseUrl = 'https://qkbknjelwntrhhvqeuko.supabase.co';
const supabaseKey = 'SUA_ANON_PUBLIC_KEY';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// ----------------------
// URLs públicas do Codespace
// ----------------------
INDEX_URL → /index.html
REGISTER_URL → /src/html/register.html
FORGOT_URL → /src/html/forget_password.html
RESET_URL → /src/html/reset_password.html
DASHBOARD_URL → /src/admin/dashboard.html
// ----------------------
// REGISTER
// ----------------------
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    const role = registerForm.role.value;

    // 1️⃣ Criar usuário no Auth
    const { data: authData, error: authError } = await supabaseClient.auth.signUp({ email, password });

    if (authError) {
      alert('❌ ' + authError.message);
      return;
    }

    // 2️⃣ Criar perfil na tabela profiles
    const { data: profileData, error: profileError } = await supabaseClient
      .from('profiles')
      .insert([{ id: authData.user.id, email: email, role: role }]);

    if (profileError) {
      alert('❌ Erro ao criar perfil: ' + profileError.message);
      return;
    }

    alert('✅ Registration successful! Check your email to verify.');
    window.location.href = INDEX_URL;
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

    if (error) {
      alert('❌ ' + error.message);
      return;
    }

    if (remember) localStorage.setItem('rememberedEmail', email);
    else localStorage.removeItem('rememberedEmail');

    alert('💖 Login successful!');
    window.location.href = DASHBOARD_URL;
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
