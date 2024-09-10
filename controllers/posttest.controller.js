import jwt from "jsonwebtoken";

export function PostTestController(req, res, next) {
  res.status(200).json({
    code: 200,
    answer: "Hello",
  });
}
