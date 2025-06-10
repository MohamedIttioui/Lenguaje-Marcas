document.addEventListener("DOMContentLoaded", function () {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  let editorBtn = document.getElementById("editorBtn").parentElement; // Obtener el elemento `<li>`

  if (!user || user.type !== "admin") {
    editorBtn.style.display = "none"; // Oculta si no es admin
  }
});
