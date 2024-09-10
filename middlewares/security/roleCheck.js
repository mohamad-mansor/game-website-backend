export function checkRole(role) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(403).json({ error: "Access denied! No user found." });
    }

    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ error: "Access denied! Insufficient privileges." });
    }

    next();
  };
}
