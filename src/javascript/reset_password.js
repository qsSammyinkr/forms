// ----------------------
// Configuração Supabase
// ----------------------
const supabaseUrl = 'https://qkbknjelwntrhhvqeuko.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrYmtuamVsd250cmhodnFldWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NDQyMDksImV4cCI6MjA3NzQyMDIwOX0.hiGQJp50YPW4_HnU8w91i2HSzTlk5wUVMlV7uOlWnQw';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// ----------------------
// Reset Password
// ----------------------
const resetForm = document.getElementById('resetForm');
if (resetForm) {
  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;

    const { data, error } = await supabaseClient.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert('❌ ' + error.message);
    } else {
      alert('✅ Password updated successfully!');
      window.location.href = '/index.html';
    }
  });
}
