const router = require("express").Router();
const { create, getVolumes, getVol } = require("../controllers/volumesController");

router.post("/create", create);
router.get("/get/:user", getVolumes);
router.get("/:user/:id", getVol)
module.exports = router;