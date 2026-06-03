const { IMAGE_MAX_SIZE_MB } = require("./upload.middleware");

function errorHandler(err, req, res, next){
    console.error("ERROR", err.message);
    const status = err.status || (err.code === "LIMIT_FILE_SIZE" ? 400 : 500);
    const message = err.code === "LIMIT_FILE_SIZE" ? `A imagem deve ter no maximo ${IMAGE_MAX_SIZE_MB}MB` : err.message;

    return res.status(status).json({
        message: message || "Erro interno no servidor"
    });
}

module.exports = {errorHandler};
