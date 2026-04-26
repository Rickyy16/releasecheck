const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");

router.get("/", controller.getReleases);
router.post("/", controller.createRelease);
router.get("/:id", controller.getReleaseById);
router.put("/:id", controller.updateRelease);
router.delete("/:id", controller.deleteRelease);

module.exports = router;