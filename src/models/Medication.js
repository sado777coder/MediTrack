const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    time: {
      type: String, // "08:00"
      required: true
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily"
    }
  },
  { _id: false }
);

const medicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    instructions: {
      type: String
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    },
    schedules: [scheduleSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medication", medicationSchema);