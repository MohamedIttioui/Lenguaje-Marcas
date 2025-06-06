document.addEventListener("DOMContentLoaded", function () {
  var registroBtn = document.getElementById("registroBtn");
  var mensajeCentral = document.getElementById("mensajeCentral");
  var mensajeCentralContenido = document.getElementById("mensajeCentralContenido");

  // Función para mostrar mensaje central
  function mostrarMensajeCentral(mensaje, duracion = 3000) {
    mensajeCentralContenido.textContent = mensaje;
    mensajeCentral.style.display = "flex";

    setTimeout(() => {
      mensajeCentral.style.display = "none";
    }, duracion);
  }

  // Función para crear o actualizar mensaje de error al lado del input
  function mostrarError(input, mensaje) {
    limpiarError(input);
    // Crear span para mensaje de error
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.textContent = mensaje;
    input.parentNode.appendChild(errorSpan);
    input.classList.add("input-error");
    input.focus();
    animarShake(input);
  }

  // Función para limpiar mensaje de error del input
  function limpiarError(input) {
    input.classList.remove("input-error");
    const parent = input.parentNode;
    const errorSpan = parent.querySelector(".error-message");
    if (errorSpan) {
      parent.removeChild(errorSpan);
    }
  }

  // Animación de sacudida (shake) con CSS
  function animarShake(element) {
    element.classList.add("shake");
    element.addEventListener("animationend", () => {
      element.classList.remove("shake");
    }, { once: true });
  }

  registroBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Evita el envío del formulario
    var form = document.querySelector("form");

    // Obtener inputs
    var inputNom = form["nom"];
    var inputApellidos = form["apellidos"];
    var inputEmail = form["email"];
    var inputConfirmEmail = form["confirmEmail"];
    var inputPassword = document.getElementById("password");
    var inputConfirmPassword = document.getElementById("confirm-password");
    var inputUserType = document.querySelector("input[name='user_type']:checked");
    var checkboxTerms = document.getElementById("terms");

    // Limpiar errores anteriores
    [inputNom, inputApellidos, inputEmail, inputConfirmEmail, inputPassword, inputConfirmPassword].forEach(limpiarError);

    // Validaciones con mensajes al lado y focus + animación
    if (!inputNom.value.trim()) {
      mostrarError(inputNom, "El nombre es obligatorio.");
      return;
    }

    if (!inputApellidos.value.trim()) {
      mostrarError(inputApellidos, "Los apellidos son obligatorios.");
      return;
    }

    if (!inputEmail.value.trim()) {
      mostrarError(inputEmail, "El correo electrónico es obligatorio.");
      return;
    }

    if (!inputConfirmEmail.value.trim()) {
      mostrarError(inputConfirmEmail, "Por favor, confirma el correo electrónico.");
      return;
    }

    if (inputEmail.value.trim() !== inputConfirmEmail.value.trim()) {
      mostrarError(inputConfirmEmail, "Los correos electrónicos no coinciden.");
      return;
    }

    if (!inputPassword.value.trim()) {
      mostrarError(inputPassword, "La contraseña es obligatoria.");
      return;
    }

    if (!inputConfirmPassword.value.trim()) {
      mostrarError(inputConfirmPassword, "Por favor, confirma la contraseña.");
      return;
    }

    if (inputPassword.value.trim() !== inputConfirmPassword.value.trim()) {
      mostrarError(inputConfirmPassword, "Las contraseñas no coinciden.");
      return;
    }

    if (!inputUserType) {
      mostrarMensajeCentral("Debes seleccionar un tipo de usuario.");
      return;
    }

    if (!checkboxTerms.checked) {
      mostrarMensajeCentral("Debes aceptar los términos y condiciones.");
      return;
    }

    // Comprobar si correo ya registrado
    var users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === inputEmail.value.trim())) {
      mostrarError(inputEmail, "Este correo ya está registrado. Usa otro.");
      return;
    }

    // Registro OK
    var newUser = {
      nom: inputNom.value.trim(),
      apellidos: inputApellidos.value.trim(),
      email: inputEmail.value.trim(),
      password: btoa(inputPassword.value.trim()),
      type: inputUserType.value,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    mostrarMensajeCentral("Registro exitoso.", 1500);

    setTimeout(() => {
      const destino = newUser.type === "admin" ? "/views/editor.html" : "/home.html";
      window.location.href = destino;
    }, 1500);
  });
});
