document.querySelectorAll("nav a").forEach(link => {

  const BASE_URL = window.location.hostname === "127.0.0.1" ? "" : "Lenguaje-Marcas";

  link.addEventListener("click", function (e) {
    e.preventDefault();

    let targetPage;
    switch (this.id) {
      case "inicioBtn": targetPage = "/home.html"; break;
      case "contactoBtn": targetPage = "/views/contact.html"; break;
      case "editorBtn": targetPage = "/views/editor.html"; break;
      case "loginBtn": targetPage = "/views/login.html"; break;
    }

    if (targetPage) {
      window.location.href = targetPage;
    }
  });
});
