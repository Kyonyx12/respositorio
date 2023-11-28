var storage = firebase.storage();
var storageRef = storage.ref();

var subirDocumentos = document.getElementById("subir-documentos");

subirDocumentos.addEventListener("submit", function (e) {
  e.preventDefault();

  // Comprobar la autenticación del usuario
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Usuario autenticado, continuar con la subida del archivo
      var file = document.getElementById("documento").files[0];

      // Definir la ruta de almacenamiento en Firebase Storage
      var filePath = "documentos/" + user.uid + "/" + file.name;

      // Subir el archivo a Firebase Storage
      var uploadTask = storageRef.child(filePath).put(file);
      uploadTask.on(
        "state_changed",
        function (snapshot) {
          // Mostrar el progreso de la carga
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Progreso de carga: " + progress + "%");
        },
        function (error) {
          // Manejar errores de carga
          console.error("Error al cargar el archivo: ", error);
        },
        function () {
          // Carga completada con éxito
          // Obtener la URL de descarga del archivo
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("URL de descarga: ", downloadURL);

            alert("Archivo cargado exitosamente.");
            location.assign("../subirDocumentosBoot.html");
            // Aquí puedes enviar la URL de descarga al servidor o hacer lo que necesites con ella
          });
        }
      );
    } else {
      console.log("Ningún usuario autenticado.");
    }
  });
});
