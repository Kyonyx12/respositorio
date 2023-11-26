var registrarClientes = document.getElementById("registrar-clientes");

registrarClientes.addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los valores de los campos del formulario
  var cliente = {
    nombre: document.getElementById("nombre").value,
    apellidoP: document.getElementById("apellidoP").value,
    apellidoM: document.getElementById("apellidoM").value,
    direccion: document.getElementById("direccion").value,
    telefono: document.getElementById("telefono").value,
    rfc: document.getElementById("rfc").value,
    curp: document.getElementById("curp").value,
    nss: document.getElementById("nss").value,
    cargo: document.getElementById("cargo").value,
    departamento: document.getElementById("departamento").value,
    email: document.getElementById("email").value,
  };

  // Obtener el correo y contraseña ingresados por el usuario
  var correo = document.getElementById("email").value;
  var contrasena = document.getElementById("contraseña").value;

  // Inicializa Firebase Authentication
  const auth = firebase.auth();

  // Crea un usuario con correo y contraseña
  auth
    .createUserWithEmailAndPassword(correo, contrasena)
    .then((userCredential) => {
      // El usuario está autenticado, ahora puedes registrar el cliente en Firestore
      registrarClienteFirestore(cliente);
    })
    .catch((error) => {
      console.error("Error al crear el usuario: ", error);
    });
});

// Función para registrar el cliente en Firebase Firestore
function registrarClienteFirestore(cliente) {
  // Inicializa Firebase Firestore
  const db = firebase.firestore();

  // Agrega el cliente a Firebase Firestore
  db.collection("clientes")
    .add(cliente)
    .then((docRef) => {
      alert("Te has registrado correctamente, ahora puedes iniciar sesion.");
      // Limpia el formulario u realiza otras acciones necesarias
      document.getElementById("registrar-clientes").reset();
      window.location = "login.html";
    })
    .catch((error) => {
      console.error(
        "Error al registrar el cliente en Firebase Firestore: ",
        error
      );
    });
}
