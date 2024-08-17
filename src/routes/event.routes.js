const {Router} = require("express");
const route = Router();
const {isAdmin, isAuthenticated} = require("../middlewares/auth");
const {addEvent, editEvent, getEventById, getAllEvents, deleteEvent} = require("../controllers/event.controllers")

route.post("/create-event", isAuthenticated, isAdmin("admin" || "mentor"),addEvent);
route.put("/update-event/:id", isAuthenticated, editEvent);
route.get("/get-event/:id", getEventById);
route.get("/", getAllEvents);
route.delete("/delete-event/:id", isAuthenticated, isAdmin("admin" || "mentor"), deleteEvent);

module.exports = route