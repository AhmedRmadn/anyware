const router = require("express").Router();
const controller = require("../controllers/instructor.controller");

router.get("/:id", controller.getById);

module.exports = router;
