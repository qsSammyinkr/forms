document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form');
  const successModal = document.getElementById('successModal');

  const errorIcon = '<i class="fa-solid fa-triangle-exclamation"></i>';
  const isEmpty = value => value.trim() === '';

  const showError = (input, message) => {
    const box = input.closest('.input-box');
    const errorSpan = box.querySelector('.error');
    errorSpan.innerHTML = `${errorIcon} ${message}`;
    box.classList.add('invalid');
    box.classList.remove('valid');
  };

  const showValid = input => {
    const box = input.closest('.input-box');
    const errorSpan = box.querySelector('.error');
    errorSpan.innerHTML = '';
    box.classList.remove('invalid');
    box.classList.add('valid');
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

    const firstName = document.querySelector('#name');
    const lastName = document.querySelector('#last_name');
    const birthdate = document.querySelector('#birthdate');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm_password');
    const gender = document.querySelector('input[name="gender"]:checked');

    // === Validation ===
    if (isEmpty(firstName.value)) { showError(firstName, 'First name is required'); valid = false; } else showValid(firstName);
    if (isEmpty(lastName.value)) { showError(lastName, 'Last name is required'); valid = false; } else showValid(lastName);
    if (isEmpty(birthdate.value)) { showError(birthdate, 'Birthdate is required'); valid = false; } else showValid(birthdate);
    if (isEmpty(email.value)) { showError(email, 'Email is required'); valid = false; } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError(email, 'Enter a valid email'); valid = false; } 
    else showValid(email);
    if (isEmpty(password.value)) { showError(password, 'Password is required'); valid = false; } 
    else if (password.value.length < 6) { showError(password, 'Password must be at least 6 characters'); valid = false; } 
    else showValid(password);
    if (isEmpty(confirmPassword.value)) { showError(confirmPassword, 'Please confirm your password'); valid = false; } 
    else if (password.value !== confirmPassword.value) { showError(confirmPassword, 'Passwords do not match'); valid = false; } 
    else showValid(confirmPassword);
    if (!gender) { valid = false; alert('Please select a gender'); }

    // === Show success modal ===
    if (valid) {
      successModal.classList.add('active');
      setTimeout(() => {
        successModal.classList.remove('active');
        window.location.href = "src/admin/logina.html"; // redireciona
      }, 2000);
    }
  });
});
