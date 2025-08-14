const router = require("express").Router();
const controller = require("../controllers/quiz.controller");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/instructor/:instructorId", controller.getByInstructorId);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
