const pointsRepo = require("../repositories/points.repo");

async function me(req, res, next) {
  try {
    const honeyPoints = await pointsRepo.getHoneyPoints(req.user.id);
    res.json({ honeyPoints });
  } catch (e) {
    next(e);
  }
}

module.exports = { me };
