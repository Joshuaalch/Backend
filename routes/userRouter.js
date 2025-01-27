const ControllerUser = require("../controllers/controllerUser");
const validateBody = require("../middlewares/validateBody");



const userRouter = (app) => {
  let response = {
    data: "message",
    code: "code",
  };
  
//obtener usuario por cedula/ ruta api
app.route("/auth/login").post(async (req, res) => {
  let response = { data: null, code: null };
  try {
    const { id_cedula, contrasena } = req.body;

    if (!id_cedula || !contrasena) {
      response.data = "Cédula y contraseña son requeridas";
      response.code = "400";
      return res.status(400).send(response);
    }

    const controller = new ControllerUser();
    const user = await controller.auth(id_cedula, contrasena);

    if (!user) {
      response.data = "Credenciales incorrectas";
      response.code = "401";
      return res.status(401).send(response);
    }

    response.data = {
      message: "Login exitoso",
      user,
    };
    response.code = "200";
    return res.status(200).send(response);
  } catch (error) {
    console.error("Error en /auth/login:", error.stack);
    response.data = error.message;
    response.code = "500";
    return res.status(500).send(response);
  }
})


  //eliminar usuario por cedula/ ruta api
  .delete(async (req, res) => {
    try {
      const controller = new ControllerUser();
      const { cedula } = req.params;

      if(!cedula){
          response.data = "La cédula es obligatoria";
          response.code = "400";
          return res.send(response);
      }

      const result = await controller.deleteUserByCedula(cedula);
      if (result.success) {
        response.data = result.message;
        response.code = "200";
      } else {
        response.data = "El Usuario No fue eliminado";
        response.code = "400";
      }
    } catch (error) {
      response.data = error.message;
      response.code = "500";
    }
    res.send(response);
  })


  app.route("/user")
    // Crear usuario
    .post(async (req, res) => {
      try {
        const controller = new ControllerUser();

        const result = await controller.insertUser(req.body);

        if (result.success) {
          response.data = "El Usuario fue creado correctamente";
          response.code = "200";
        } else {
          response.data = "El Usuario No fue creado";
          response.code = "400";
        }
      } catch (error) {
        response.data = error.message;
        response.code = "500";
      }
      res.send(response);
    })

    // Obtener todos los usuarios
    .get(async (req, res) => {
      try {
        const controller = new ControllerUser();
        const users = await controller.getAllUsers();
        response.data = users;
        response.code = "200";
      } catch (error) {
        response.data = error.message;
        response.code = "500";
      }
      res.send(response);
    })
    
    // Actualizar usuario por cédula
    // Actualizar usuario por cédula
.patch(async (req, res) => {
  // Inicializa el objeto response
  const response = {
    data: null,
    code: null,
  };

  try {
    // Instancia el controlador y llama al método para actualizar el usuario
    const controller = new ControllerUser();
    const result = await controller.updateUserByCedula(req.body);
    
    // Verifica el resultado del controlador
    if (result.success) {
      response.data = result.message || "Usuario actualizado correctamente";
      response.code = "200";
    } else {
      response.data = "El Usuario no fue actualizado";
      response.code = "400";
    }
  } catch (error) {
    // Captura errores y devuelve una respuesta adecuada
    response.data = error.message || "Error interno del servidor";
    response.code = "500";
  }

  // Envía la respuesta al cliente
  res.status(response.code).json(response);
});


};

module.exports = userRouter;
