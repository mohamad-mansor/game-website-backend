import createHttpError from "http-errors";
import { UserModel } from "../../models/User.model.js";

export async function userAuthorization(req, res, next) {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    next(createHttpError.Unauthorized("Invalid Login Credentials"));
    return;
  }

  const check = await user.authenticate(req.body.password);

  if (!check) {
    next(createHttpError.Unauthorized("Invalid Login Credentials"));
    return;
  }
  req.user = user;
  next();
}
