const connectionDB = require('./connectionDB'); // Asegúrate de que la ruta sea correcta

class FileData {
  static async saveFile(data) {
    const client = await connectionDB.connect(); // Conecta a la base de datos
    try {
      const { id_empresa, id_cedula, fecha, img1, img2, img3, pdf, detalle } = data;

      const query = `
        INSERT INTO tbregistros (id_empresa, id_cedula, fecha, img1, img2, img3, pdf, detalle)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [id_empresa, id_cedula, fecha, img1, img2, img3, pdf, detalle];

      await client.query(query, values);
    } catch (error) {
      console.error('Error saving file:', error.message);
      throw error;
    } finally {
      await connectionDB.disconnect(); // Cierra la conexión
    }
  }
}

module.exports = FileData;
