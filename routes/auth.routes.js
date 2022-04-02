const router = require("express").Router();
const { postSignup, postLogin } = require("../controllers/auth.controller");
const { userValidationSchema, loginValidationSchema } = require("../validations/user.validator");
const { validateSchema } = require("../middlewares/validate.middleware");
const { fetchUserNameCollectionInLogin } = require('../middlewares/user.middleware');

const validateUser = validateSchema(userValidationSchema);
const validateLogin = validateSchema(loginValidationSchema);

router.post("/signup", validateUser, postSignup);
router.post("/login", validateLogin, fetchUserNameCollectionInLogin, postLogin);

module.exports = router;