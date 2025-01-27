const ControllerConsultation = require("../controllers/controllerConsultation");
const validateBody = require("../middlewares/validateBody");

const consultationRouter = (app) => {
  let response = {
    data: "message",
    code: "code",
  };
  
  //obtener consultas  por cedula/ ruta api
  app.route("/consultation/:cedula")
  .get(async (req, res) => {
    try {
      const { cedula } = req.params; // Obtiene la cédula de la URL
      const controller = new ControllerConsultation();
      const user = await controller.getConsultationByCedula(cedula);

      if (user) {
        response.data = user;
        response.code = "200";
      } else {
        response.data = "Consulta usuario no encontrada";
        response.code = "404";
      }
    } catch (error) {
      response.data = error.message;
      response.code = "500";
    }
    res.send(response);
  })

 //eliminar consulta por cedula
  app.route("/consultation/:id_consulta")

  .patch(async (req, res) => {
    try {
      const controller = new ControllerConsultation();
      const { id_consulta } = req.params;

      if(!id_consulta){
          response.data = "identificador necesario";
          response.code = "400";
          return res.send(response);
      }

      const result = await controller.deleteConsultation(id_consulta);
      if (result.success) {
        response.data = result.message;
        response.code = "200";
      } else {
        response.data = "Consulta  No fue eliminada";
        response.code = "400";
      }
    } catch (error) {
      response.data = error.message;
      response.code = "500";
    }
    res.send(response);
  });

 //crear las consultas
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


    // Obtener todas
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
    
    // Actualizar consultation
    .patch(async (req, res) => {
      try {
        const controller = new ControllerConsultation();
        const result = await controller.updateConsultation(req.body);
        if (result.success) {
          response.data = result.message;
          response.code = "200";
        } else {
          response.data = "Consulta No fue actualizada";
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
