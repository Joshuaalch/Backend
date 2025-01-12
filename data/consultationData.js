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

// Crear una nueva consulta
static async createConsultation(data) {
  const connection = await db.connect();
  try {
    const {
      id_cedula,
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
      `INSERT INTO tbconsulta(
          id_cedula,
          id_tipoconsulta,
          valoracion,
          presion_arterial,
          frecuencia_cardiaca,
          saturacion_oxigeno,
          glicemia,
          frecuencia_respiratoria,
          plan_tratamiento,
          fecha_consulta,
          monto_consulta
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id_cedula,
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
      ]
    );

    return result.insertId; // Devuelve el ID de la nueva consulta
  } catch (error) {
    console.error("Error al crear la consulta:", error.message);
    throw error;
  } finally {
    await db.disconnect();
  }
}

// Actualizar una consulta
static async updateConsultation(data) {
  const connection = await db.connect();
  try {
    const {
      id_consulta,
      id_cedula,
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
      `UPDATE tbconsulta
       SET 
         id_cedula = ?, 
         id_tipoconsulta = ?, 
         valoracion = ?, 
         presion_arterial = ?, 
         frecuencia_cardiaca = ?, 
         saturacion_oxigeno = ?, 
         glicemia = ?, 
         frecuencia_respiratoria = ?, 
         plan_tratamiento = ?, 
         fecha_consulta = ?, 
         monto_consulta = ?
       WHERE id_consulta = ?`,
      [
        id_cedula,
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
        id_consulta,
      ]
    );

    // Verifica si se actualizó algún registro
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error al actualizar la consulta:", error.message);
    throw error;
  } finally {
    await db.disconnect();
  }
}

// Eliminar una consulta (cambio de estado)
static async deleteConsultation(id_consulta) {
  const connection = await db.connect();
  try {
    const [result] = await connection.query(
      `UPDATE tbconsulta SET estado = ? WHERE id_consulta = ?`,
      [0, id_consulta] // Cambia el estado a 0 (inactivo)
    );
    return result.affectedRows > 0; // Devuelve true si se actualizó correctamente
  } catch (error) {
    console.error("Error al eliminar la consulta:", error.message);
    throw error;
  } finally {
    await db.disconnect();
  }
}

}

module.exports = ConsultationData;