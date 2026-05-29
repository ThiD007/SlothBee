const repo = require("../repositories/user.repo");
const { hashPassword } = require("../utils/password");

async function me(req, res, next) {
  try {
    const user = await repo.findById(req.user.id);
    res.json(user);
  } catch (e) { next(e); }
}

async function update(req, res, next) {
  try{
    const { nome, name, email, senha, password } = req.body;
    const userName = nome || name;
    const plainPassword = senha || password;

    if (!userName || !email || !plainPassword) {
      return res.status(400).json({ message: "Nome, e-mail e senha sao obrigatorios" });
    }

    const password_hash = await hashPassword(plainPassword);
    await repo.userUpdate(req.user.id, userName, email, password_hash);
    const user = await repo.findById(req.user.id);
    res.json(user);
  } catch(e){ next(e);}
}

async function remove(req, res, next) {
  try {
    await repo.userDelete(req.user.id);

    res.json({ message: "Usuário deletado" });

  } catch (e) {
    next(e);
  }
}

module.exports = { me, update, remove };
