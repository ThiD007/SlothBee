const repo = require("../repositories/user.repo");
const { hashPassword } = require("../utils/password");
const fs = require("fs");
const path = require("path");

const profileUploadDir = path.join(__dirname, "../../uploads/profile");

function deleteProfilePhotoFile(foto_perfil) {
  if (!foto_perfil) return;

  const fileName = path.basename(foto_perfil);
  const filePath = path.join(profileUploadDir, fileName);

  if (filePath.startsWith(profileUploadDir) && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

async function me(req, res, next) {
  try {
    const user = await repo.findById(req.user.id);
    res.json(user);
  } catch (e) { next(e); }
}

async function update(req, res, next) {
  try{
    const { nome, name, email, telefone, cargo, senha, password } = req.body;
    const userName = nome || name;
    const plainPassword = senha || password;

    if (!userName || !email) {
      return res.status(400).json({ message: "Nome e e-mail sao obrigatorios" });
    }

    const password_hash = plainPassword ? await hashPassword(plainPassword) : null;
    await repo.userUpdate(req.user.id, {
      nome: userName,
      email,
      telefone,
      cargo,
      senha: password_hash,
    });
    const user = await repo.findById(req.user.id);
    res.json(user);
  } catch(e){ next(e);}
}

async function updatePhoto(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Imagem do perfil e obrigatoria" });
    }

    const currentUser = await repo.findById(req.user.id);
    deleteProfilePhotoFile(currentUser?.foto_perfil);

    const foto_perfil = `/uploads/profile/${req.file.filename}`;
    await repo.userPhotoUpdate(req.user.id, foto_perfil);

    const user = await repo.findById(req.user.id);
    res.json(user);
  } catch (e) {
    next(e);
  }
}

async function removePhoto(req, res, next) {
  try {
    const currentUser = await repo.findById(req.user.id);
    deleteProfilePhotoFile(currentUser?.foto_perfil);

    await repo.userPhotoUpdate(req.user.id, null);

    const user = await repo.findById(req.user.id);
    res.json(user);
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    await repo.userDelete(req.user.id);

    res.json({ message: "Usuário deletado" });

  } catch (e) {
    next(e);
  }
}

module.exports = { me, update, updatePhoto, removePhoto, remove };
