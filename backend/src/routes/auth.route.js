import express from "express";

const router = express.Router();

router.post("/signup/user/customer");
router.post("/login/user/customer");

router.post("/signup/user/vendor");
router.post("/login/user/vendor");

router.post("/signup/user/delivery");
router.post("/login/user/delivery");

router.post("/signup/user/admin");

export default router;
