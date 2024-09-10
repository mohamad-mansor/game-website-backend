export async function signUpController(req, res, next) {
  try {
    res
      .status(200)
      .cookie("jwt", req.jwt, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 3600000,
      })
      .json({
        code: 200,
        answer: req.user,
      });
  } catch (error) {
    const err = new Error("SIGNUP - Server Error, Contact Support");
    next(err);
  }
}
