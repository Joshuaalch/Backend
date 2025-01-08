function validateBody(req, res, next) {
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

module.exports = validateBody;
