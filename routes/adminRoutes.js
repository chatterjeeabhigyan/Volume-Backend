const router = require('express').Router();
const { changeAdmin } = require("../controllers/usersController");

router.put("/changeadmin/:id", changeAdmin);
module.exports = router;