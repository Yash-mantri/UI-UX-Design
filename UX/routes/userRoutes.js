const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);

router.get("/users", ctrl.getAll);
router.get("/users/:username", ctrl.getUser);

router.post("/users", ctrl.addUser);
router.put("/users/:id", ctrl.updateUser);
router.put("/users/password/:id", ctrl.updatePassword);
router.delete("/users/:id", ctrl.deleteUser);

module.exports = router;
