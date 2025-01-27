const FileData = require('../data/fileData');

class FileController {
  async uploadFile(req, res) {
    try {
      const { id_empresa, id_cedula, fecha, detalle } = req.body;
      const img1 = req.files.image1 ? req.files.image1[0].buffer : null;
      const img2 = req.files.image2 ? req.files.image2[0].buffer : null;
      const img3 = req.files.image3 ? req.files.image3[0].buffer : null;
      const pdf = req.files.pdf ? req.files.pdf[0].buffer : null;

      console.log('Data received:', { id_empresa, id_cedula, fecha, detalle, img1, img2, img3, pdf });

      const fileData = {
        id_empresa,
        id_cedula,
        fecha,
        img1,
        img2,
        img3,
        pdf,
        detalle
      };

      await FileData.saveFile(fileData);
      res.status(200).send('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      res.status(500).send('Error uploading file');
    }
  }
}

module.exports = new FileController();
