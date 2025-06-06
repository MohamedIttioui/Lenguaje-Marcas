document.querySelectorAll("nav a").forEach(link => {
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
