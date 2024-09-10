import jwt from "jsonwebtoken";

export function createJWT(req, res, next) {
  const userid = req.user.id;
  const payload = {
    id: userid,
  };
  const token = jwt.sign(payload, process.env.JWTKEY, { expiresIn: "1h" });
  req.jwt = token;
  next();
}
