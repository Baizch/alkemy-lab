const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../db");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const jwt = require("jwt-simple");

//user registration
router.post(
  "/register",
  [
    check("username", "Por favor, ingresa un nombre de usuario")
      .not()
      .isEmpty(),
    check("email", "El email debe ser correcto").isEmail(),
    check("password", "Por favor, ingresa una contraseña").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);
  }
);

//user log in
router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const areEqual = bcrypt.compareSync(req.body.password, user.password);
    if (areEqual) {
      res.json({ success: createToken(user) });
    } else {
      res.json({ error: "Usuario y/o contraseña incorrectos" });
    }
  } else {
    res.json({ error: "Usuario y/o contraseña incorrectos" });
  }
});

//token creation
const createToken = (user) => {
  const payload = {
    userId: user.id,
    createdAt: moment().unix(),
    expiredAt: moment().add(5, "minutes").unix(),
  };
  return jwt.encode(payload, "top secret");
};

module.exports = router;
