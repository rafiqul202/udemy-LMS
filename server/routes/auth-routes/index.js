import express from "express";
import { loginUser, registerUser } from "../../controllers/auth.controllers.js";
import { authenticate } from "../../middleware/auth-middleware.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", authenticate, (req, res) => {
  const user = res.user;
  res
    .status(200)
    .json({ success: true, message: "Authenticated User!", data: { user } });
});
export default router;
