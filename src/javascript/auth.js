// ----------------------
// Configuração Supabase
// ----------------------
const supabaseUrl = 'https://qkbknjelwntrhhvqeuko.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrYmtuamVsd250cmhodnFldWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NDQyMDksImV4cCI6MjA3NzQyMDIwOX0.hiGQJp50YPW4_HnU8w91i2HSzTlk5wUVMlV7uOlWnQw'; // ⚠️ Coloque sua ANON PUBLIC KEY verdadeira aqui
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

  // Preencher email automaticamente se estiver salvo
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

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      // Salvar ou remover o email no localStorage
      if (remember) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      alert('💖 Login successful!');
      window.location.href = '/src/admin/dashboard.html';
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
