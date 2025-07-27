import express from "express";
import {
  checkUserAuth,
  customerLogin,
  customerLogout,
  customerSignup,
} from "../controllers/auth.controller.js";
import { protectUserRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/check-user-auth", protectUserRoute, checkUserAuth);

router.post("/user/signup", customerSignup);
router.post("/user/login", customerLogin);
router.post("/user/logout", customerLogout);

// router.post("/signup/user/vendor");
// router.post("/login/user/vendor");

// router.post("/signup/user/delivery");
// router.post("/login/user/delivery");

export default router;
