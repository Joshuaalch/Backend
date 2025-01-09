const db = require("./connectionDB");


class ConsultationData {
    
  // Obtener todas las consultas
  static async getAllConsultation() {
    const connection = await db.connect();
    try {
      const [rows] = await connection.query(
        "SELECT id_consulta, id_cedula, id_empresa, id_tipoconsulta, valoracion, presion_arterial, frecuencia_cardiaca, saturacion_oxigeno, glicemia, frecuencia_respiratoria, plan_tratamiento, fecha_consulta, monto_consulta, estado FROM tbconsulta WHERE estado = 1"
      );
      return rows;
    } catch (error) {
      console.error("Error al obtener las consultas:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }
  

  
  // Obtener un paciente por su cédula
  static async getUserByCedula(cedula) {
    const connection = await db.connect();
    try {
      const [rows] = await connection.query(
        "SELECT  id_cedula, tipo_cedula, id_empresa, nombre, apellidos, conocido_como, telefono,telefono_emergencia,correo, residencia, observaciones FROM tbpaciente WHERE id_cedula = ? AND estado = 1",
        [cedula]
      );
      return rows[0] || null; // Devuelve el usuario o null si no existe
    } catch (error) {
      console.error("Error al obtener el paciente:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  // Crear un nueva consulta
  static async createConsultation(data) {
    const connection = await db.connect();
    try {

      const {
        id_cedula,
        id_empresa,
        id_tipoconsulta,
        valoracion,
        presion_arterial,
        frecuencia_cardiaca,
        saturacion_oxigeno,
        glicemia,
        frecuencia_respiratoria,
        plan_tratamiento,
        fecha_consulta,
        monto_consulta,
      } = data;

      const [result] = await connection.query(
        `INSERT INTO tbconsulta(id_cedula, id_empresa, id_tipoconsulta, valoracion,presion_arterial, frecuencia_cardiaca, saturacion_oxigeno,glicemia,frecuencia_respiratoria,plan_tratamiento,fecha_consulta, monto_consulta,estado)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`,
        [
            id_cedula,
            id_empresa,
            id_tipoconsulta,
            valoracion,
            presion_arterial,
            frecuencia_cardiaca,
            saturacion_oxigeno,
            glicemia,
            frecuencia_respiratoria,
            plan_tratamiento,
            fecha_consulta,
            monto_consulta,
          1,
        ]
      );
      return result.insertId; // Devuelve el ID 
    } catch (error) {
      console.error("Error al crear la consulta:", error.message);
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

module.exports = ConsultationData;
