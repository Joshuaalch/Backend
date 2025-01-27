//const PatientData = require("../data/patientData");
const UserData = require("../data/userData");



class ControllerUser {

  
  // Autenticación
  async auth(cedula, contrasena) {
    try {
      const user = await UserData.login(cedula, contrasena); // Método estático
      if (!user) {
        throw new Error("Credenciales incorrectas");
      }
      return user;
    } catch (error) {
      console.error("Error en la autenticación:", error.message);
      throw error;
    }
  }

  // Cambiar de contrasena
  async changeUserPassword(cedula, nuevaContrasena) {
    try {
        const result = await UserData.changePassword(
        cedula,
        nuevaContrasena
      );
      if (!result) {
        throw new Error(`No se encontró un usuario con la cédula ${cedula}`);
      }
      return { success: true, message: "Contraseña cambiada con éxito" };
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error.message);
      throw error;
    }
  }

  // Crear usuario
  async insertUser(data) {
    try {
      const result = await UserData.createUser(data); // Método estático
      return { success: true, id: result };
    } catch (error) {
      console.error("Error al insertar usuario:", error.message);
      throw error;
    }
  }

  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      const users = await UserData.getAllUsers(); // Método estático
      return users;
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
      throw error;
    }
  }

  // Obtener un usuario por cedula
  async getUserByCedula(cedula) {
    try {
      const user = await UserData.getUserByCedula(cedula); // Método estático

      if (!user) {
        throw new Error(`No se encontró un usuario con la cédula ${cedula}`);
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
      const result = await UserData.deleteUser(cedula); // Método estático
      if (!result) {
        throw new Error(`No se encontró un usuario con la cédula ${cedula}`);
      }
      return { success: true, message: "Paciente eliminado con éxito" };
    } catch (error) {
      console.error("Error al eliminar paciente:", error.message);
      throw error;
    }
  }

  // Actualizar usuario por cédula
  async updateUserByCedula(data) {

    console.log('Datos enviados al servidor:', data);
    try {
      
      const result = await UserData.updateUser(data); // Método estático
      
      if (!result) {
        throw new Error(
          `No se encontró un usuario con la cédula ${data.id_cedula}`
        );
      }
      return { success: true, message: "Usuario actualizado con éxito" };
    } catch (error) {
      console.error("Error al actualizar usuario:", error.message);
      throw error;
    }
  }

}

module.exports = ControllerUser;
