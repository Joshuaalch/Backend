const ControllerConsultation = require("../controllers/controllerConsultation");
const validateBody = require("../middlewares/validateBody");

const consultationRouter = (app) => {
  let response = {
    data: "message",
    code: "code",
  };
  
  //Obtener paciente por cedula/ ruta api
  app.route("/consultation/:id_consulta")
  .get(async (req, res) => {
    try {
      const { cedula } = req.params; // Obtiene la cédula de la URL
      const controller = new ControllerPatient();
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

 //Eliminar consulta por cedula
  app.route("/consultation/:cedula")

  .delete(async (req, res) => {
    try {
      const controller = new ControllerConsultation();
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
        response.data = "La consulta no fue eliminado";
        response.code = "400";
      }
    } catch (error) {
      response.data = error.message;
      response.code = "500";
    }
    res.send(response);
  });

 //Crear las consultas
  app.route("/consultation")
  .post(async (req, res) => {
    const response = {};
    try {
      const controller = new ControllerConsultation();
      const result = await controller.createConsultation(req.body);

      if (result.success) {
        response.data = "La consulta fue creada correctamente";
        response.code = "200";
      } else {
        response.data = "La consulta No fue creado";
        response.code = "400";
      }
    } catch (error) {
      response.data = error.message;
      response.code = "500";
    }
    res.send(response);
  })


    // Obtener todas las consultas
    .get(async (req, res) => {
      try {
        const controller = new ControllerConsultation();
        const consultation = await controller.getAllConsultation();
        response.data = consultation;
        response.code = "200";
      } catch (error) {
        response.data = error.message;
        response.code = "500";
      }
     
      res.send(response);
    })
    
    // Actualizar consulta
    .patch(async (req, res) => {
      try {
        const controller = new ControllerConsultation();
        const result = await controller.updateUserByCedula(req.body);
        if (result.success) {
          response.data = result.message;
          response.code = "200";
        } else {
          response.data = "La consulta no fue actualizado";
          response.code = "400";
        }
      } catch (error) {
        response.data = error.message;
        response.code = "500";
      }
      res.send(response);
    });

};

module.exports = consultationRouter;