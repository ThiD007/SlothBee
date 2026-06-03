const repo = require("../repositories/user.repo");
const { hashPassword } = require("../utils/password");
const { uploadProfilePhoto, deleteProfilePhoto } = require("../utils/cloudinary");

function normalizeUser(user) {
  if (!user) return null;

  return {
    ...user,
    id: Number(user.id),
    equipe_id: user.equipe_id === null || user.equipe_id === undefined ? null : Number(user.equipe_id),
  };
}

async function me(req, res, next) {
  try {
    const user = await repo.findById(req.user.id);
    res.json(normalizeUser(user));
  } catch (e) { next(e); }
}

async function list(req, res, next) {
  try {
    const users = await repo.listUsers();
    res.json({ users: users.map(normalizeUser).filter(Boolean) });
  } catch (e) { next(e); }
}

async function update(req, res, next) {
  try{
    const { nome, name, email, telefone, cargo, senha, password } = req.body;
    const userName = nome || name;
    const userEmail = String(email || "").trim().toLowerCase();
    const plainPassword = senha || password;

    if (!userName || !userEmail) {
      return res.status(400).json({ message: "Nome e e-mail sao obrigatorios" });
    }

    const password_hash = plainPassword ? await hashPassword(plainPassword) : null;
    await repo.userUpdate(req.user.id, {
      nome: userName,
      email: userEmail,
      telefone,
      cargo,
      senha: password_hash,
    });
    const user = await repo.findById(req.user.id);
    res.json(normalizeUser(user));
  } catch(e){ next(e);}
}

async function updatePhoto(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Imagem do perfil e obrigatoria" });
    }

    const upload = await uploadProfilePhoto(req.file, req.user.id);
    await repo.userPhotoUpdate(req.user.id, upload.secure_url);

    const user = await repo.findById(req.user.id);
    res.json(normalizeUser(user));
  } catch (e) {
    next(e);
  }
}

async function removePhoto(req, res, next) {
  try {
    await deleteProfilePhoto(req.user.id);
    await repo.userPhotoUpdate(req.user.id, null);

    const user = await repo.findById(req.user.id);
    res.json(normalizeUser(user));
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

module.exports = { list, me, update, updatePhoto, removePhoto, remove };
