var loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var email = document.getElementById("floatingInput").value;
  var password = document.getElementById("floatingPassword").value;

  // Inicia sesión con correo y contraseña
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Usuario autenticado con éxito
      window.location.assign("./indexBoot.html");
      localStorage.setItem("usuario", email);
      alert("Inicio de sesión exitoso");
    })
    .catch((error) => {
      console.error("Error al iniciar sesión: ", error);
      alert(
        "Error al iniciar sesión. Por favor, verifica tu correo y contraseña."
      );
    });
});
