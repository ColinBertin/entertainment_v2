const { register, login, logout } = require("../controllers/authController");
const { userVerification } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/api/v1/auth", userVerification);
router.post("/api/v1/register", register);
router.post("/api/v1/login", login);
router.post("/api/v1/logout", logout);

module.exports = router;
