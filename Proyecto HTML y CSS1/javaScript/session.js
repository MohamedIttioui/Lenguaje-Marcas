document.addEventListener("DOMContentLoaded", function () {
  // Obtener usuario logueado
  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Control de acceso a editor.html solo para admin
  if (
    window.location.pathname.endsWith("/views/editor.html") &&
    (!user || user.type !== "admin")
  ) {
    window.location.href = "/home.html"; // Redirige al home si no es admin
    return;
  }

  // Mostrar u ocultar botón logout según sesión activa
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.style.display = user ? "inline-block" : "none";

    // Evento logout dentro de DOMContentLoaded para que el botón exista
    logoutBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Evita acción por defecto (enlace)
      localStorage.removeItem("loggedInUser");
      window.location.href = "/home.html";
    });
  }

  // Mostrar/ocultar botón Editor solo para admin
  const editorBtn = document.getElementById("editorBtn")?.parentElement;
  if (editorBtn) {
    editorBtn.style.display = user && user.type === "admin" ? "inline-block" : "none";
  }

  // Temporizador para cierre de sesión por inactividad (2 minutos)
  let timeoutId;

  function resetTimer() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      alert("Sesión cerrada por inactividad.");
      localStorage.removeItem("loggedInUser");
      window.location.href = "/home.html";
    }, 2 * 60 * 1000); // 120000 ms
  }

  // Eventos que reinician el temporizador
  document.addEventListener("mousemove", resetTimer);
  document.addEventListener("keypress", resetTimer);
  document.addEventListener("click", resetTimer);

  // Inicia temporizador al cargar
  resetTimer();
});
