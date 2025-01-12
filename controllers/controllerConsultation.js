const ConsultationData = require("../data/consultationData");

class ControllerConsultation {

  // Crear consluta
  async createConsultation(data) {
    try {
      const result = await ConsultationData.createConsultation(data); // Método estático
      return { success: true, id: result };
    } catch (error) {
      console.error("Error al crear consulta:", error.message);
      throw error;
    }
  }

  // Obtener todas las consultas
  async getAllConsultation() {
    try {
      const consultation = await ConsultationData.getAllConsultation(); // Método estático, devuelve todos los usuarios (pacientes)
      return consultation;
    } catch (error) {
      console.error("Error al obtener paciente:", error.message);
      throw error;
    }
  }

  // Obtener una consulta por cedula
  async getUserByCedula(cedula) {
    try {
      const consultation = await ConsultationDataData.getUserByCedula(cedula); // Método estático

      if (!consultation) {
        throw new Error(`No se encontró ninguna consulta asociada a la cédula ${cedula}`);
      }
    
      return consultation;
    } catch (error) {
      console.error("Error al obtener consulta:", error.message);
      throw error;
    }
  }

  // Eliminar consulta por cédula
  async deleteUserByCedula(cedula) {
    try {
      const result = await ConsultationDataData.deleteUser(cedula); // Método estático
      if (!result) {
        throw new Error(`No se encontró ninguna consulta asociada a la cédula ${cedula}`);
      }
      return { success: true, message: "Consulta eliminada con éxito" };
    } catch (error) {
      console.error("Error al eliminar consulta:", error.message);
      throw error;
    }
  }

  // Actualizar consulta por cédula
  async updateUserByCedula(data) {
    try {
      const result = await PatientData.updateUser(data); // Método estático
      if (!result) {
        throw new Error(`No se encontró ninguna consulta asociada a la cédula ${data.id_cedula}`);
      }
      return { success: true, message: "Consulta actualizada con éxito" };
    } catch (error) {
      console.error("Error al actualizar consulta:", error.message);
      throw error;
    }
  }
}

module.exports = ControllerConsultation;