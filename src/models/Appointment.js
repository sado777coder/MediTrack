const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    doctorName: {
      type: String,
      required: true,
      trim: true
    },

    clinicName: {
      type: String,
      required: true,
      trim: true
    },

    appointmentDateTime: {
      type: Date,
      required: true,
      index: true // sorting + reminders
    },

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
      index: true
    },

    //  Prevent duplicate reminders
    reminderSent: {
      type: Boolean,
      default: false,
      index: true
    },

    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

/**
 * COMPOUND INDEX
 * Used for:
 * - my appointments
 * - date range queries
 * - sorting
 */
appointmentSchema.index({ userId: 1, appointmentDateTime: -1 });

/**
 * TEXT SEARCH
 */
appointmentSchema.index({
  doctorName: "text",
  clinicName: "text"
});

module.exports = mongoose.model("Appointment", appointmentSchema);