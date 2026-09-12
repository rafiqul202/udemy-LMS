import jwt from "jsonwebtoken";

const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("authenticate authHeader details data", authHeader);

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "User is not authenticated" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyToken(token, "JWT_SECRET");
    res.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
};
