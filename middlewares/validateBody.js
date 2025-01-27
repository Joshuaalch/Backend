/*function validateBody(req, res, next) {
    // Verifica si el método es POST, PATCH o PUT
    if (["POST", "PATCH", "PUT"].includes(req.method)) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "El cuerpo de la solicitud no puede estar vacío.",
            });
        }
    }
    // Si no hay problema, continúa con el siguiente middleware o controlador
    next();
}

module.exports = validateBody;*/
/*
function validateBody(req, res, next) {
    // Saltar la validación si el contenido es multipart/form-data
    if (req.headers["content-type"] && req.headers["content-type"].includes("multipart/form-data")) {
        return next(); // Deja que multer maneje esta solicitud
    }

    // Verifica si el método es POST, PATCH o PUT
    if (["POST", "PATCH", "PUT"].includes(req.method)) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "El cuerpo de la solicitud no puede estar vacío.",
            });
        }
    }

    // Si no hay problema, continúa con el siguiente middleware o controlador
    next();
}

module.exports = validateBody;*/
function validateBody(req, res, next) {
    const contentType = req.headers["content-type"];
    console.log(`[${req.method}] Content-Type: ${contentType}`);
    console.log("Request Body:", req.body);

    if (contentType && contentType.includes("multipart/form-data")) {
        return next();
    }

    if (["POST", "PATCH", "PUT"].includes(req.method)) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "El cuerpo de la solicitud no puede estar vacío.",
            });
        }
    }

    next();
}

module.exports = validateBody;

