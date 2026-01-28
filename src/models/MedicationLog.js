const mongoose = require("mongoose");

const medicationLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    medicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medication",
      required: true
    },
    takenAt: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["taken", "missed", "skipped"],
      required: true
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicationLog", medicationLogSchema);