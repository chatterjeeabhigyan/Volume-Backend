const router = require("express").Router();
const { create } = require("../controllers/volumesController");

router.post("/create", create);

module.exports = router;