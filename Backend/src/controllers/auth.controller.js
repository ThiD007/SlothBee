const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/password");
const repo = require("../repositories/user.repo");

async function register(req, res, next) {
  try {
    const { nome, name, email, senha, password } = req.body;
    const userName = nome || name;
    const plainPassword = senha || password;

    if (!userName || !email || !plainPassword) {
      return res.status(400).json({ message: "Nome, e-mail e senha sao obrigatorios" });
    }

    const exists = await repo.findByEmail(email);
    if (exists) return res.status(409).json({ message: "E-mail já cadastrado" });

    const hash = await hashPassword(plainPassword);
    await repo.createUser(userName, email, hash);
    res.status(201).json({ message: "Usuário criado" });
  } catch (e) { next(e); }
}

async function login(req, res, next) {
  try {
    const { email, senha, password } = req.body;
    const plainPassword = senha || password;

    if (!email || !plainPassword) {
      return res.status(400).json({ message: "E-mail e senha sao obrigatorios" });
    }

    const user = await repo.findByEmail(email);
    if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

    const ok = await comparePassword(plainPassword, user.password_hash);
    if (!ok) return res.status(401).json({ message: "Credenciais inválidas" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ accessToken: token });
  } catch (e) { next(e); }
}

module.exports = { register, login };
