const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  image: {
    type: String,

  },
  name: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
