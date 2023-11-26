var logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", function () {
  // Cierra la sesión del usuario
  firebase.auth().signOut().then(function() {
    // Sign-out exitoso
    alert("Sesión cerrada con éxito");
    localStorage.removeItem("usuario");
    window.location="./index.html";
  }).catch(function(error) {
    // An error happened.
    console.error("Error al cerrar sesión: ", error);
    alert("Error al cerrar sesión. Por favor, inténtalo de nuevo.");
  });
});
