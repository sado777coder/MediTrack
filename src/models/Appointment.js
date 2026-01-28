const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true // 
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
      index: true //  used for sorting & reminders
    },

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
      index: true //  filtering
    },

    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

/**
 *  COMPOUND INDEX (most important)
 * Used for:
 * - "my appointments"
 * - date range queries
 * - sorting
 */
appointmentSchema.index(
  { userId: 1, appointmentDateTime: -1 }
);


 // Optional text index (doctor search)
appointmentSchema.index({
  doctorName: "text",
  clinicName: "text"
});

module.exports = mongoose.model("Appointment", appointmentSchema);