const express = require("express");
const payBookController = require("../controllers/payBook.controller");
const router = express.Router();

router.get("/", payBookController.getAll);
router.get("/create", payBookController.create);
router.post("/", payBookController.postCreate);
router.get("/delete/:_id", payBookController.delete);
router.get("/update/:_id", payBookController.update);
router.post("/update/:_id", payBookController.postUpdate);
module.exports = router;
