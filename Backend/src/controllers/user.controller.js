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
    const { name, email, password } = req.body;
    const password_hash = await hashPassword(password);
    await repo.userUpdate(req.user.id, name, email, password_hash);
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