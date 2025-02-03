const db = require("./connectionDB");
const bcrypt = require("bcrypt");

class UserData {
  // Obtener todos los usuarios
  static async getAllUsers() {
    const connection = await db.connect();
    try {
      const [rows] = await connection.query("SELECT id_cedula, tipo_cedula, id_empresa, nombre, apellidos, correo, telefono, rol FROM tbusuario  WHERE estado = 1");
      return rows;
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  // Obtener un usuario por su cédula
  static async getUserByCedula(cedula) {
    const connection = await db.connect();
    try {
      const [rows] = await connection.query(
        "SELECT  id_cedula, nombre, apellidos, correo, telefono FROM tbusuario WHERE id_cedula = ? AND estado = 1",
        [cedula]
      );
      return rows[0] || null; // Devuelve el usuario o null si no existe
    } catch (error) {
      console.error("Error al obtener el usuario:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  // Crear un nuevo usuario
  static async createUser(data) {
    const connection = await db.connect();
    try {

      const {
        id_cedula,
        tipo_cedula,
        id_empresa,
        nombre,
        apellidos,
        correo,
        telefono,
        contrasena,
        rol
      } = data;

      const contrasenaHashed = await bcrypt.hash(contrasena, 10);

      const [result] = await connection.query(
        `INSERT INTO tbusuario (id_cedula, tipo_cedula, id_empresa, nombre, apellidos, correo, telefono, contrasena, rol, estado)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id_cedula,
          tipo_cedula,
          id_empresa,
          nombre,
          apellidos,
          correo,
          telefono,
          contrasenaHashed,
          rol,
          1,
        ]
      );
      return result.insertId; // Devuelve el ID del nuevo usuario
    } catch (error) {
      console.error("Error al crear el usuario:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  // Actualizar un usuario
  static async updateUser(data) {
    const connection = await db.connect();
    try {
      const {id_cedula, nombre, apellidos, correo, telefono, estado } =
        data;
      const [result] = await connection.query(
        `UPDATE tbusuario
                 SET  nombre = ?, apellidos = ?, correo = ?, telefono = ?, estado = ?
                 WHERE id_cedula = ?`,
        [ nombre, apellidos, correo, telefono,  estado, id_cedula]
      );
      return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  // Eliminar un usuario
  static async deleteUser(cedula) {
    const connection = await db.connect();
    try {
      const [result] = await connection.query(
        //`DELETE FROM tbusuario WHERE id_cedula = ?`,
        `UPDATE tbusuario SET estado = ? WHERE id_cedula = ?`,
        [0, cedula]
      );
      return result.affectedRows > 0; // Devuelve true si se eliminó correctamente
    } catch (error) {
      console.error("Error al eliminar el usuario:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  // Login de usuario
  static async login(cedula, contrasena) {
    console.log("Cédula ingresada:", cedula);
    console.log("Contraseña ingresada:", contrasena);
  
  
    const connection = await db.connect(); // Obtén la conexión activa
    try {
      // Consulta el usuario por cédula
      const [rows] = await connection.query(
        "SELECT * FROM tbusuario WHERE id_cedula = ?",
        [cedula]
      );
  
      const user = rows[0];
      console.log("Resultado de la consulta:", user); // Debug
  
      if (!user) {
        console.error("Usuario no encontrado con ID:", cedula);
        return null; // Usuario no encontrado
      }
  
      // Verifica la contraseña usando bcrypt
      const isMatch = await bcrypt.compare(String(contrasena), String(user.contrasena));
     // const isMatch = await bcrypt.compare(contrasena, user.contrasena);
      console.log("Comparación de contraseñas:", isMatch); // Debug: Resultado de la comparación
  
      if (!isMatch) {
        console.error("Contraseña incorrecta para el usuario:", cedula);
        return null; // Contraseña incorrecta
      }
  
      // Elimina campos sensibles antes de devolver el usuario
      delete user.contrasena;
      //delete user.id_empresa;
      delete user.tipo_cedula;
      delete user.rol;
  
      return user; // Devuelve el usuario autenticado
    } catch (error) {
      console.error("Error en el login del usuario:", error.message);
      throw error;
    } finally {
      await db.disconnect(); // Cierra la conexión
    }
  }
  
  

  // Cambiar contraseña
  static async changePassword(cedula, nuevaContrasena) {
    const connection = await db.connect();
    try {
        // Cifrar la nueva contraseña
        const contrasenaHashed = await bcrypt.hash(nuevaContrasena, 10);

        const [result] = await connection.query(
            `UPDATE tbusuario SET contrasena = ? WHERE id_cedula = ?`,
            [contrasenaHashed, cedula]
        );
        return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error.message);
        throw error;
    } finally {
        await db.disconnect();
    }
}

}

module.exports = UserData;
