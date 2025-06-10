document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const confirmEmailInput = document.getElementById("confirmEmail");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const registerBtn = document.getElementById("registroBtn");
  const passwordStrength = document.getElementById("passwordStrength");

  // Deshabilita el botón de registro inicialmente
  //registerBtn.disabled = true;

  // Alternar visibilidad de la contraseña al hacer clic en el ícono
  togglePasswordBtn.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePasswordBtn.textContent = isPassword ? "🔒" : "👁️";
  });

  passwordInput.addEventListener("paste", function (event) {
    event.preventDefault();
    alert("No puedes copiar-pegar la contraseña por seguridad.");
  });

  // Expresiones regulares para validar email y contraseña
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*._-])[A-Za-z\d!@#$%^&*._-]{8,}$/;

  // Obtiene o crea un solo span de error por input
  function getOrCreateErrorMessageElement(input) {
    let errorText = input.parentNode.querySelector(".error-message");
    if (!errorText) {
      errorText = document.createElement("span");
      errorText.className = "error-message";
      errorText.setAttribute("aria-live", "polite");
      input.parentNode.appendChild(errorText);
    }
    return errorText;
  }

  // Función para validar cualquier input y mostrar un mensaje si es inválido
  function validarInput(input, condicion, mensajeError = "", relacionado = null) {
    const errorText = getOrCreateErrorMessageElement(input);

    if (condicion) {
      input.style.border = "2px solid green";
      errorText.textContent = "";
      if (relacionado) relacionado.style.border = "2px solid green";
    } else {
      input.style.border = "2px solid red";
      if (errorText.textContent !== mensajeError) {
        errorText.textContent = mensajeError; // Evita mostrar múltiples veces el mismo mensaje
      }
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 500);
    }
  }

  // Calcula la fuerza de la contraseña según ciertos criterios
  function calcularFuerzaPassword(password) {
    let fuerza = 0;
    if (password.length >= 8) fuerza++;
    if (/[A-Z]/.test(password)) fuerza++;
    if (/[a-z]/.test(password)) fuerza++;
    if (/\d/.test(password)) fuerza++;
    if (/[!@#$%^&*._-]/.test(password)) fuerza++;
    return fuerza;
  }

  // Actualiza la barra de fuerza visual de la contraseña
  function mostrarFuerzaPassword(password) {
    if (!passwordStrength) return;

    const fuerza = calcularFuerzaPassword(password);
    passwordStrength.style.width = `${(fuerza / 5) * 100}%`;
    const colores = ["red", "orange", "gold", "yellowgreen", "green"];
    passwordStrength.style.backgroundColor = colores[Math.max(0, fuerza - 1)];
  }

  // Habilita o deshabilita el botón de registro si los campos son válidos
  function validarFormulario() {
    const emailValid = emailRegex.test(emailInput.value) && emailInput.value === confirmEmailInput.value;
    const passwordValid = passwordRegex.test(passwordInput.value) && passwordInput.value === confirmPasswordInput.value;
    const userTypeSelected = document.querySelector("input[name='user_type']:checked") !== null;
    //registerBtn.disabled = !(emailValid && passwordValid && userTypeSelected);
  }

  confirmPasswordInput.addEventListener("input", function () {
    validarInput(
      confirmPasswordInput,
      passwordInput.value === confirmPasswordInput.value,
      "Las contraseñas no coinciden.",
      passwordInput
    );
    validarFormulario();
  });

  // Validar formato de email
  emailInput.addEventListener("input", function () {
    validarInput(emailInput, emailRegex.test(emailInput.value), "Email inválido.");
    validarFormulario();
  });

  confirmEmailInput.addEventListener("input", function () {
    validarInput(confirmEmailInput, emailInput.value === confirmEmailInput.value, "Los emails no coinciden.");
    validarFormulario();
  });

  // Validar contraseña y mostrar su fuerza
  passwordInput.addEventListener("input", function () {
    const esValida = passwordRegex.test(passwordInput.value);
    validarInput(passwordInput, esValida, "Contraseña insegura o inválida.");
    mostrarFuerzaPassword(passwordInput.value);
    validarFormulario();
  });

  // Validar formulario completo cuando cambie cualquier input
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", validarFormulario);
  });
});
