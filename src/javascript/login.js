document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#login_form');

  // Cria o painel de mensagens
  const messagePanel = document.createElement('div');
  messagePanel.id = 'loginMessage';
  document.body.appendChild(messagePanel);

  const ADMIN_USER = "Meyser";
  const ADMIN_PASS = "Sammyinkr#035r";

  const isEmpty = value => value.trim() === '';

  const showMessage = (type, text) => {
    messagePanel.className = ''; // reset classes
    messagePanel.classList.add(type); // success ou error
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-triangle-exclamation"></i>';
    messagePanel.innerHTML = `${icon} ${text}`;
    messagePanel.style.display = 'flex';
    messagePanel.style.animation = 'slideIn 0.4s ease forwards';

    setTimeout(() => {
      messagePanel.style.animation = 'slideOut 0.4s ease forwards';
      setTimeout(() => {
        messagePanel.style.display = 'none';
      }, 400);
    }, 2500);
  };

  const showError = (input, message) => {
    const box = input.closest('.input-box');
    const errorSpan = box.querySelector('.error');
    errorSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${message}`;
    box.classList.add('invalid');
    box.classList.remove('valid');
    box.animate([{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(0)' }], { duration: 200 });
  };

  const showValid = input => {
    const box = input.closest('.input-box');
    const errorSpan = box.querySelector('.error');
    errorSpan.innerHTML = '';
    box.classList.remove('invalid');
    box.classList.add('valid');
    box.animate([{ transform: 'scale(0.95)' }, { transform: 'scale(1)' }], { duration: 150 });
  };

  // Toggle password visibility
  const passwordIcons = document.querySelectorAll('.password-icon');
  passwordIcons.forEach(icon => {
    icon.addEventListener('click', function () {
      const input = this.parentElement.querySelector('.form-control');
      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        this.classList.replace("fa-eye-slash", "fa-eye");
      } else {
        input.type = "password";
        this.classList.replace("fa-eye", "fa-eye-slash");
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    const username = document.querySelector('#username');
    const password = document.querySelector('#password');

    // Validação
    if (isEmpty(username.value)) { showError(username, 'Username is required'); valid = false; } 
    else showValid(username);

    if (isEmpty(password.value)) { showError(password, 'Password is required'); valid = false; } 
    else showValid(password);

    // Check credentials
    if (valid) {
      if (username.value === ADMIN_USER && password.value === ADMIN_PASS) {
        showMessage('success', 'Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = "/src/admin/dashboard.html";
        }, 2500);
      } else {
        showMessage('error', 'Invalid username or password!');
        username.value = '';
        password.value = '';
        username.focus();
        showError(username, 'Invalid!');
        showError(password, 'Invalid!');
      }
    }
  });
});
