const DiaryData = require("../data/diaryData");

class ControllerDiary {

  // Crear usuario
  async createDiary(data) {
    try {
      const result = await PatientData.createUser(data); // Método estático
      return { success: true, id: result };
    } catch (error) {
      console.error("Error al crear paciente:", error.message);
      throw error;
    }
  }

  // Obtener todos los usuarios
  async getAllDiary() {
    try {
      const diarys = await DiaryData.getAllDiary(); // Método estático, devuelve todas citas 
      return diarys;
    } catch (error) {
      console.error("Error al obtener citas:", error.message);
      throw error;
    }
  }

  // Obtener un usuario por cedula
  async getDiaryByCedula(cedula) {
    try {
      const user = await DiaryDataData.getDiaryByCedula(cedula); // Método estático

      if (!user) {
        throw new Error(`No se encontró cita programada para el paciente con la cédula ${cedula}`);
      }
    
      return user;
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
      throw error;
    }
  }

  // Eliminar usuario por cédula
  async deleteUserByCedula(cedula) {
    try {
      const result = await PatientData.deleteUser(cedula); // Método estático
      if (!result) {
        throw new Error(`No se encontró paciente con la cédula ${cedula}`);
      }
      return { success: true, message: "Usuario eliminado con éxito" };
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
      throw error;
    }
  }

  // Actualizar usuario por cédula
  async updateUserByCedula(data) {
    try {
      const result = await PatientData.updateUser(data); // Método estático
      if (!result) {
        throw new Error(`No se encontró un usuario con la cédula ${data.id_cedula}`);
      }
      return { success: true, message: "Usuario actualizado con éxito" };
    } catch (error) {
      console.error("Error al actualizar usuario:", error.message);
      throw error;
    }
  }
}

module.exports = ControllerDiary;
