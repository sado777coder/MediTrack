const MedicationLogModel = require("../models/MedicationLog");

/**
 * CREATE MEDICATION LOG
 */
const createMedicationLog = async (req, res, next) => {
  try {
    const log = await MedicationLogModel.create({
      userId: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      message: "Medication log created",
      data: log,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET ALL MEDICATION LOGS (PAGINATED + FILTERED)
 */
const getMedicationLogs = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { status, fromDate, toDate, medicationId } = req.query;

    const filter = { userId: req.user._id };

    // Status filter
    if (status) {
      filter.status = status;
    }

    // Medication filter
    if (medicationId) {
      filter.medicationId = medicationId;
    }

    // Date range filter
    if (fromDate || toDate) {
      filter.takenAt = {};
      if (fromDate) filter.takenAt.$gte = new Date(fromDate);
      if (toDate) filter.takenAt.$lte = new Date(toDate);
    }

    const total = await MedicationLogModel.countDocuments(filter);

    const logs = await MedicationLogModel.find(filter)
      .populate("medicationId", "name dosage")
      .sort({ takenAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Medication logs fetched",
      total,
      page,
      pages: Math.ceil(total / limit),
      count: logs.length,
      filters: { status, fromDate, toDate, medicationId },
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET SINGLE LOG
 */
const getMedicationLogById = async (req, res, next) => {
  try {
    const log = await MedicationLogModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!log) {
      return res.status(404).json({ message: "Medication log not found" });
    }

    res.status(200).json({
      message: "Medication log fetched",
      data: log,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE LOG
 */
const updateMedicationLog = async (req, res, next) => {
  try {
    const log = await MedicationLogModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!log) {
      return res.status(404).json({ message: "Medication log not found" });
    }

    res.status(200).json({
      message: "Medication log updated",
      data: log,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE LOG
 */
const deleteMedicationLog = async (req, res, next) => {
  try {
    const log = await MedicationLogModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!log) {
      return res.status(404).json({ message: "Medication log not found" });
    }

    res.status(200).json({
      message: "Medication log deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMedicationLog,
  getMedicationLogs,
  getMedicationLogById,
  updateMedicationLog,
  deleteMedicationLog,
};