const express = require("express");
const router = express.Router();

const { contentControllers } = require("../controllers")

router.get("/", contentControllers.getAllContents)
router.get("/:id", contentControllers.getContentById)
router.post("/", contentControllers.createNewContent)
router.patch("/:id", contentControllers.editContentById)
router.delete("/:id", contentControllers.deleteContentById)

module.exports = router;