const express = require("express");

const validation = require("../middleware/validations/validate");

const storeController = require("../controllers/storeController");

const router = express.Router();

router.post("/singlePersonStore",validation,storeController.createStore);

module.exports = router;