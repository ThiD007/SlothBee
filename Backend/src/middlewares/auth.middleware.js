const jwt = require("jsonwebtoken");

function isAdminEmail(email) {
    return String(email || "").toLowerCase().endsWith("@gmail.com.adm");
}

function authRequired(req, res, next){
      const auth = req.headers.authorization;
    if(!auth) return res.status(401).json({message: "Token ausente"});  

    const [,token] = auth.split(" ");
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch{
        return res.status(401).json({message: "TOKEN INVÁLIDO"});
    }
};

function adminRequired(req, res, next) {
    if (!isAdminEmail(req.user?.email)) {
        return res.status(403).json({ message: "Acesso permitido apenas para administradores" });
    }

    next();
}

module.exports = {authRequired, adminRequired, isAdminEmail}
