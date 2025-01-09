const express = require('express');
const validateBody = require("./middlewares/validateBody");

const PORT = 3000;

const app = express();
app.use(express.json());

// Middleware global para validar el cuerpo de las solicitudes
app.use(validateBody);


app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Node.js!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//const connectionDB = require('./data/connectionDB');
//connectionDB.connect();

// routers
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


