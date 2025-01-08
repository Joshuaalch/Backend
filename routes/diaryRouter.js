const ControllerDiary = require("../controllers/controllerDiary");
const validateBody = require("../middlewares/validateBody");

const diaryRouter = (app) => {
  let response = {
    data: "message",
    code: "code",
  };
  
  //obtener paciente por cedula/ ruta api
  app.route("/diary/:cedula")
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

 //eliminar paciente por cedula
  app.route("/patient/:cedula")

  .delete(async (req, res) => {
    try {
      const controller = new ControllerPatient();
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
        response.data = "El paciente No fue eliminado";
        response.code = "400";
      }
    } catch (error) {
      response.data = error.message;
      response.code = "500";
    }
    res.send(response);
  });

 //crear los pacientes
  app.route("/diary")
  .post(async (req, res) => {
    const response = {};
    try {
      const controller = new ControllerPatient();
      const result = await controller.createUser(req.body);

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


    // Obtener todos los pacientes
    .get(async (req, res) => {
      try {
        const controller = new ControllerDiary();
        const diarys = await controller.getAllDiary();
        response.data = diarys;
        response.code = "200";
      } catch (error) {
        response.data = error.message;
        response.code = "500";
      }
     
      res.send(response);
    })
    
    // Actualizar Cita
    .patch(async (req, res) => {
      try {
        const controller = new ControllerDiary();
        const result = await controller.updateDiaryByCedula(req.body);
        if (result.success) {
          response.data = result.message;
          response.code = "200";
        } else {
          response.data = "Cita No fue actualizado";
          response.code = "400";
        }
      } catch (error) {
        response.data = error.message;
        response.code = "500";
      }
      res.send(response);
    });

};

module.exports = diaryRouter;
