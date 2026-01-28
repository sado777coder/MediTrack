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
      default: Date.now // now defaults to current timestamp
    },
    status: {
      type: String,
      enum: ["taken", "missed", "skipped"],
      default: "taken" // default status
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
);

// Optional: add index for faster queries on user + medication + takenAt
medicationLogSchema.index({ userId: 1, medicationId: 1, takenAt: -1 });

module.exports = mongoose.model("MedicationLog", medicationLogSchema);