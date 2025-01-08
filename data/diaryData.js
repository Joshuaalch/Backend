const db = require("./connectionDB");


class DiaryData {
    
  // Obtener todas las citas
  static async getAllDiary() {
    const connection = await db.connect();
    try {
      const [rows] = await connection.query("SELECT id_cedula_usuario,id_cedula_paciente,fecha, hora_inicio, hora_final FROM tbcita ");
      return rows;
    } catch (error) {
      console.error("Error al obtener citas:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  
  // Obtener una cita por cedula de paciente para verificar
  static async getDiaryByCedula(cedula) {
    const connection = await db.connect();
    try {
      const [rows] = await connection.query(
        "SELECT  id_cedula_usuario,id_cedula_paciente,fecha, hora_inicio, hora_final FROM tbcita WHERE id_cedula_paciente = ? ",
        [cedula]
      );
      return rows[0] || null; // Devuelve el usuario o null si no existe
    } catch (error) {
      console.error("Error al obtener cita de dicho paciente:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  // Crear un nuevo paciente
  static async createUser(data) {
    const connection = await db.connect();
    try {

      const {
        id_cedula,
        tipo_cedula,
        id_empresa,
        nombre,
        apellidos,
        conocido_como,
        telefono,
        telefono_emergencia,
        correo,
        residencia,
        observaciones
      } = data;

      const [result] = await connection.query(
        `INSERT INTO tbpaciente (id_cedula, tipo_cedula, id_empresa, nombre, apellidos,conocido_como, telefono, telefono_emergencia,correo,residencia,observaciones, estado)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
        [
          id_cedula,
          tipo_cedula,
          id_empresa,
          nombre,
          apellidos,
          conocido_como,
          telefono,
          telefono_emergencia,
          correo,
          residencia,
          observaciones,
          1,
        ]
      );
      return result.insertId; // Devuelve el ID del nuevo paciente
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
      const {
        id_cedula,
        tipo_cedula,
        nombre,
        apellidos,
        conocido_como,
        telefono,
        telefono_emergencia,
        correo,
        residencia,
        observaciones
      } = data;
  
      // Validación de datos requeridos
      if (!id_cedula || !tipo_cedula || !nombre || !apellidos) {
        throw new Error("Faltan datos obligatorios para actualizar el usuario");
      }
  
      const [result] = await connection.query(
        `UPDATE tbpaciente
         SET tipo_cedula = ?, nombre = ?, apellidos = ?, conocido_como = ?, telefono = ?, telefono_emergencia = ?, correo = ?, residencia = ?, observaciones = ?
         WHERE id_cedula = ?`,
        [
          tipo_cedula,
          nombre,
          apellidos,
          conocido_como,
          telefono,
          telefono_emergencia,
          correo,
          residencia,
          observaciones,
          id_cedula
        ]
      );
  
      return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  // Eliminar un paciente
  static async deleteUser(cedula) {
    const connection = await db.connect();
    try {
      const [result] = await connection.query(
        //`DELETE FROM tbusuario WHERE id_cedula = ?`,
        `UPDATE tbpaciente SET estado = ? WHERE id_cedula = ?`,
        [0, cedula]
      );
      return result.affectedRows > 0; // Devuelve true si se eliminó correctamente
    } catch (error) {
      console.error("Error al eliminar el paciente:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  

}

module.exports = DiaryData;