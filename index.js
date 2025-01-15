const express = require('express');
const validateBody = require("./middlewares/validateBody");
const cors = require('cors');

const PORT = 3001;

// Crear una sola instancia de express
const app = express();

// Habilita CORS globalmente para todas las rutas
app.use(cors());

// Middleware global para manejar JSON y validar el cuerpo de las solicitudes
app.use(express.json());
app.use(validateBody); // Asegúrate de que este middleware sea necesario

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Node.js!');
});

// Definir rutas
const userRouter = require('./routes/userRouter');
userRouter(app);

const empresaRouter = require("./routes/empresaRouter");
empresaRouter(app);

const authRouter = require("./routes/authRouter");
authRouter(app);

const patientRouter = require('./routes/patientRouter');
patientRouter(app);

const diaryRouter = require('./routes/diaryRouter');
diaryRouter(app);

const consultationRouter = require('./routes/consultationRouter');
consultationRouter(app);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
