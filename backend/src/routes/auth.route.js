import express from "express";
import {
  checkDeliveryAuth,
  checkUserAuth,
  checkVendorAuth,
  customerLogin,
  customerLogout,
  customerSignup,
  deliveryLogin,
  deliveryLogout,
  deliverySignup,
  vendorLogin,
  vendorLogout,
  vendorSignup,
} from "../controllers/auth.controller.js";
import { protectDeliveryRoute, protectUserRoute, protectVendorRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/check-user-auth", protectUserRoute, checkUserAuth);
router.get("/check-vendor-auth", protectVendorRoute, checkVendorAuth)
router.get("/cehck-delivery-auth", protectDeliveryRoute, checkDeliveryAuth)

router.post("/user/signup", customerSignup);
router.post("/user/login", customerLogin);
router.post("/user/logout", customerLogout);

router.post("/signup/vendor", vendorSignup);
router.post("/login/vendor", vendorLogin);
router.post("/logout/vendor", vendorLogout)

router.post("/signup/delivery", deliverySignup);
router.post("/login/delivery", deliveryLogin);
router.post("/logout/delivery", deliveryLogout)

export default router;
