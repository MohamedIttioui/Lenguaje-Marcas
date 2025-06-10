function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function guardarUsuarios(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function guardarUsuario(nom, apellidos, email, password, type) {
  let users = obtenerUsuarios();

  if (users.some((user) => user.email === email)) {
    alert("Este correo ya está registrado. Usa otro.");
    return false;
  }

  let newUser = {
    nom,
    apellidos,
    email,
    password: btoa(password), // Encriptación de contraseña con Base64
    type,
  };

  users.push(newUser);
  guardarUsuarios(users);
  return true;
}

function eliminarUsuario(email) {
  let users = obtenerUsuarios().filter((user) => user.email !== email);
  guardarUsuarios(users);
}

function iniciarSesion(email, password) {
  let users = obtenerUsuarios();
  let usuario = users.find((u) => u.email === email && u.password === btoa(password)); // Comparando la contraseña encriptada

  if (usuario) {
    localStorage.setItem("loggedInUser", JSON.stringify(usuario));

    alert("Inicio de sesión exitoso.");
    setTimeout(() => {
      window.location.href = usuario.type === "admin" ? "admin.html" : "home.html";
    }, 1500);
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

function cerrarSesion() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
