document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("loginForm");
  var mensajeContainer = document.getElementById("mensajeContainer");

  if (!loginForm) {
    console.error("Error: No se encontró el formulario de login.");
    return;
  }

  // Agregar contenedor y toggle para la contraseña
  var passwordInput = document.getElementById("password");
  if (passwordInput) {
    var passwordContainer = document.createElement("div");
    passwordContainer.classList.add("password-container");

    passwordInput.parentNode.insertBefore(passwordContainer, passwordInput);
    passwordContainer.appendChild(passwordInput);

    var togglePassword = document.createElement("i");
    togglePassword.className = "fas fa-eye toggle-password";
    passwordContainer.appendChild(togglePassword);

    togglePassword.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
      }
    });
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var inputEmail = document.getElementById("username").value.trim();
    var inputPasswordValue = passwordInput.value.trim();

    var users = JSON.parse(localStorage.getItem("users")) || [];
    var usuario = users.find(
      (user) => user.email === inputEmail && user.password === btoa(inputPasswordValue)
    );

    if (!usuario) {
      mostrarMensaje("Usuario o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(usuario));
    mostrarMensaje("Inicio de sesión exitoso.");

    setTimeout(() => {
      var destino = usuario.type === "admin" ? "/views/editor.html" : "/home.html";
      window.location.href = destino;
    }, 2000);
  });

  function mostrarMensaje(mensaje) {
    mensajeContainer.innerHTML = `
      <p>${mensaje}</p>
      <button id="cerrarMensaje">Cerrar</button>
    `;
    mensajeContainer.style.display = "block";

    document.getElementById("cerrarMensaje").onclick = function () {
      mensajeContainer.style.display = "none";
    };

    setTimeout(() => {
      mensajeContainer.style.display = "none";
    }, 3000);
  }
});
