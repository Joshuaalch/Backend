const ControllerUser = require("../controllers/controllerUser");
const validateBody = require("../middlewares/validateBody");

const userRouter = (app) => {
  let response = {
    data: "message",
    code: "code",
  };
  
//obtener usuario por cedula/ ruta api
  app.route("/user/:cedula")
  .get(async (req, res) => {
    try {
      const { cedula } = req.params; // Obtiene la cédula de la URL
      const controller = new ControllerUser();
      const user = await controller.getUserByCedula(cedula);

      if (user) {
        response.data = user;
        response.code = "200";
      } else {
        response.data = "Usuario no encontrado";
        response.code = "404";
      }
    } catch (error) {
      response.data = error.message;
      response.code = "500";
    }
    res.send(response);
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
    .patch(async (req, res) => {
      try {
        const controller = new ControllerUser();
        const result = await controller.updateUserByCedula(req.body);
        if (result.success) {
          response.data = result.message;
          response.code = "200";
        } else {
          response.data = "El Usuario No fue actualizado";
          response.code = "400";
        }
      } catch (error) {
        response.data = error.message;
        response.code = "500";
      }
      res.send(response);
    });

};

module.exports = userRouter;
