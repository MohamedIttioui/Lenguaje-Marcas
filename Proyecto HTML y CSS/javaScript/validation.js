document.addEventListener("DOMContentLoaded", function () {
  var emailInput = document.getElementById("email");
  var confirmEmailInput = document.getElementById("confirmEmail");
  var passwordInput = document.getElementById("password");
  var confirmPasswordInput = document.getElementById("confirm-password");
  var togglePasswordBtn = document.getElementById("togglePassword");
  var registerBtn = document.getElementById("registroBtn");
  var passwordStrength = document.getElementById("passwordStrength");

  //registerBtn.disabled = true; // Iniciar deshabilitado

  // Alternar visibilidad de contraseña
  togglePasswordBtn.addEventListener("click", function () {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    togglePasswordBtn.textContent = passwordInput.type === "password" ? "👁️" : "🔒";
  });

  // Prohibir copy-paste en la contraseña
  passwordInput.addEventListener("paste", function (event) {
    event.preventDefault();
    alert("No puedes copiar-pegar la contraseña por seguridad.");
  });

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*._-])[A-Za-z\d!@#$%^&*._-]{8,}$/;

  function validarInput(input, condicion, mensajeError, relacionado = null) {
    var errorText = input.nextElementSibling;
    if (!errorText || !errorText.classList.contains("error-message")) {
      errorText = document.createElement("span");
      errorText.classList.add("error-message");
      input.parentNode.appendChild(errorText);
    }

    if (condicion) {
      input.style.border = "2px solid green";
      errorText.textContent = "";
      if (relacionado) relacionado.style.border = "2px solid green";
    } else {
      input.style.border = "2px solid red";
      errorText.textContent = mensajeError;
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 500);
    }
  }

  function mostrarFuerzaPassword(password) {
    if (!passwordStrength) {
      console.error("Error: No se encontró el elemento #passwordStrength.");
      return;
    }
    var fuerza = password.length;
    passwordStrength.style.width = `${Math.min(fuerza * 10, 100)}%`;

    if (fuerza > 11) {
      passwordStrength.style.backgroundColor = "green";
    } else if (fuerza > 7) {
      passwordStrength.style.backgroundColor = "orange";
    } else {
      passwordStrength.style.backgroundColor = "red";
    }
  }

  confirmPasswordInput.addEventListener("input", function () {
    validarInput(confirmPasswordInput, passwordInput.value === confirmPasswordInput.value, "Las contraseñas no coinciden.", passwordInput);
  });

  emailInput.addEventListener("input", function () {
    validarInput(emailInput, emailRegex.test(emailInput.value), "Email inválido.");
  });

  confirmEmailInput.addEventListener("input", function () {
    validarInput(confirmEmailInput, emailInput.value === confirmEmailInput.value, "Los emails no coinciden.");
  });

  passwordInput.addEventListener("input", function () {
    validarInput(passwordInput, passwordRegex.test(passwordInput.value));
    mostrarFuerzaPassword(passwordInput.value);
  });

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", function () {
      var emailValid = emailRegex.test(emailInput.value) && emailInput.value === confirmEmailInput.value;
      var passwordValid = passwordRegex.test(passwordInput.value) && passwordInput.value === confirmPasswordInput.value;
      var userTypeSelected = document.querySelector("input[name='user_type']:checked") !== null;
      //console.log({emailValid, passwordValid, userTypeSelected});
      registerBtn.disabled = (emailValid && passwordValid && userTypeSelected);
    });
  });
});
