const express = require("express");
const router = express.Router();

const eventController = require("../Controllers/EventController");

router.get("/", eventController.getAllEvents);
router.post("/", eventController.addEvent);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
