const db = require("./connectionDB");


class ConsultationData {
    
  // Obtener todas las consultas
  static async getAllConsultation() {
    const connection = await db.connect();
    try {
      const [rows] = await connection.query(
        "SELECT id_consulta, id_cedula, id_empresa, tipoconsulta, valoracion, presion_arterial, frecuencia_cardiaca, saturacion_oxigeno, glicemia, frecuencia_respiratoria, plan_tratamiento, fecha_consulta, monto_consulta, estado FROM tbconsulta WHERE estado = 1"
      );
      return rows;
    } catch (error) {
      console.error("Error al obtener las consultas:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }
  
  // Obtener consultas por su cédula de paciente
  static async getConsultationByCedula(cedula) {
    const connection = await db.connect();
    try {
      const [rows] = await connection.query(
        "SELECT id_consulta, id_cedula, id_empresa, tipoconsulta, valoracion, presion_arterial, frecuencia_cardiaca, saturacion_oxigeno, glicemia, frecuencia_respiratoria, plan_tratamiento, fecha_consulta, monto_consulta FROM tbconsulta WHERE id_cedula=?",
        [cedula]
      );
      return rows || null; // Devuelve la consulta o null si no existe
    } catch (error) {
      console.error("Error al obtener consulta:", error.message);
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
        tipoconsulta,
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
        `INSERT INTO tbconsulta(id_cedula, id_empresa, tipoconsulta, valoracion,presion_arterial, frecuencia_cardiaca, saturacion_oxigeno,glicemia,frecuencia_respiratoria,plan_tratamiento,fecha_consulta, monto_consulta,estado)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`,
        [
            id_cedula,
            id_empresa,
            tipoconsulta,
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

  // Actualizar consulta
  static async updateConsultation(data) {
    const connection = await db.connect();
    try {
      const {
        id_consulta,
        id_cedula,
        tipoconsulta,
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
        `UPDATE tbconsulta
         SET tipoconsulta = ?, valoracion = ?, presion_arterial = ?, frecuencia_cardiaca = ?, saturacion_oxigeno = ?, glicemia = ?, frecuencia_respiratoria = ?, plan_tratamiento = ?, fecha_consulta = ?, monto_consulta = ?
         WHERE id_cedula = ? AND id_consulta = ?`,
        [
          tipoconsulta,
          valoracion,
          presion_arterial,
          frecuencia_cardiaca,
          saturacion_oxigeno,
          glicemia,
          frecuencia_respiratoria,
          plan_tratamiento,
          fecha_consulta,
          monto_consulta,
          id_cedula, // Debe ir aquí
          id_consulta, // Debe ir aquí
        ]
      );
  
      return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
    } catch (error) {
      console.error("Error al actualizar la consulta:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }
  
  // Eliminar Consulta  / pasar estado a 
  static async deleteConsultation(id_consulta) {
    const connection = await db.connect();
    try {
      const [result] = await connection.query(
     
        `UPDATE tbconsulta SET estado = ? WHERE id_consulta = ?`,
        [0, id_consulta]
      );
      return result.affectedRows > 0; // Devuelve true si se eliminó correctamente
    } catch (error) {
      console.error("Error al finalizar consulta:", error.message);
      throw error;
    } finally {
      await db.disconnect();
    }
  }

  

}

module.exports = ConsultationData;
