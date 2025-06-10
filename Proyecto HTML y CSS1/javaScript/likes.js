function obtenerLikes() {
  return JSON.parse(localStorage.getItem("likes")) || {};
}

function guardarLikes(likes) {
  localStorage.setItem("likes", JSON.stringify(likes));
}

function obtenerUserLikes() {
  return JSON.parse(localStorage.getItem("userLikes")) || {};
}

function guardarUserLikes(userLikes) {
  localStorage.setItem("userLikes", JSON.stringify(userLikes));
}

function mostrarMensaje(mensaje) {
  const mensajeContainer = document.createElement("div");
  mensajeContainer.classList.add("mensaje-container");
  mensajeContainer.setAttribute("role", "alertdialog");
  mensajeContainer.setAttribute("aria-modal", "true");

  const contenido = document.createElement("div");
  contenido.classList.add("mensaje-contenido");

  const p = document.createElement("p");
  p.textContent = mensaje;

  const boton = document.createElement("button");
  boton.id = "cerrarMensaje";
  boton.textContent = "Cerrar";

  contenido.appendChild(p);
  contenido.appendChild(boton);
  mensajeContainer.appendChild(contenido);
  document.body.appendChild(mensajeContainer);

  boton.addEventListener("click", function () {
    mensajeContainer.remove();
  });
}

function toggleLike(articleId) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    mostrarMensaje("Debes iniciar sesión o registrarte para dar like.");
    return;
  }

  const userId = loggedInUser.id;
  const userLikes = obtenerUserLikes();
  const likes = obtenerLikes();

  if (!userLikes[userId]) {
    userLikes[userId] = [];
  }

  const yaDioLike = userLikes[userId].includes(articleId);

  if (yaDioLike) {
    // Quitar like
    userLikes[userId] = userLikes[userId].filter(id => id !== articleId);
    if (likes[articleId]) {
      likes[articleId] -= 1;
      if (likes[articleId] < 0) likes[articleId] = 0;
    }
  } else {
    // Dar like
    userLikes[userId].push(articleId);
    likes[articleId] = (likes[articleId] || 0) + 1;
  }

  guardarUserLikes(userLikes);
  guardarLikes(likes);
  actualizarContadorLikes(articleId);
  actualizarEstadoBoton(articleId, !yaDioLike);
}

function actualizarContadorLikes(articleId) {
  const likes = obtenerLikes();
  const likeElement = document.querySelector("#likes-" + articleId);
  if (likeElement) {
    likeElement.textContent = likes[articleId] || 0;
  }
}

function actualizarEstadoBoton(articleId, dioLike) {
  const btn = document.querySelector(`.like-btn[data-id="${articleId}"]`);
  if (btn) {
    btn.classList.toggle("liked", dioLike);
    btn.setAttribute("aria-pressed", dioLike);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const botonesLike = document.querySelectorAll(".like-btn");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userId = loggedInUser ? loggedInUser.id : null;
  const userLikes = obtenerUserLikes();

  botonesLike.forEach(function (btn) {
    const articleId = btn.getAttribute("data-id");
    actualizarContadorLikes(articleId);

    const dioLike = userId && userLikes[userId]?.includes(articleId);
    actualizarEstadoBoton(articleId, dioLike);

    btn.addEventListener("click", function () {
      toggleLike(articleId);
    });
  });
});
