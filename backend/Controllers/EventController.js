const Event = require("../Model/Event");

const getAllEvents = async (req, res, next) => {
  let events;
  try {
    events = await Event.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!events || events.length === 0) {
    return res.status(404).json({ message: "No events found" });
  }
  return res.status(200).json({ events });
};

const getEventById = async (req, res, next) => {
  const id = req.params.id;
  let event;
  try {
    event = await Event.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  return res.status(200).json({ event });
};

const addEvent = async (req, res, next) => {
  const { image, name, venue, date, artist, about, time, price } = req.body;
  let event;
  try {
    event = new Event({
      image,
      name,
      venue,
      date,
      artist,
      about,
      time,
      price,
    });
    await event.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!event) {
    return res.status(500).json({ message: "Unable to add event" });
  }
  return res.status(201).json({ event });
};

const updateEvent = async (req, res, next) => {
  const id = req.params.id;
  const { image, name, venue, date, artist, about, time, price } = req.body;
  let event;
  try {
    event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.image = image;
    event.name = name;
    event.venue = venue;
    event.date = date;
    event.artist = artist;
    event.about = about;
    event.time = time;
    event.price = price;
    await event.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!event) {
    return res.status(500).json({ message: "Unable to update event" });
  }
  return res.status(200).json({ event });
};

const deleteEvent = async (req, res, next) => {
  const id = req.params.id;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
};
