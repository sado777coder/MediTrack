const MedicationModel = require("../models/Medication");

/**
 * CREATE MEDICATION
 */
const createMedication = async (req, res, next) => {
  try {
    const medication = await MedicationModel.create({
      userId: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      message: "Medication created",
      data: medication,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET ALL MEDICATIONS (PAGINATED + FILTERED)
 */
const getMedications = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { active, startDate, endDate } = req.query;
    const filter = { userId: req.user._id };
    const now = new Date();

    // Active / inactive filter
    if (active === "true") {
      filter.startDate = { $lte: now };
      filter.$or = [
        { endDate: { $exists: false } },
        { endDate: null },
        { endDate: { $gte: now } },
      ];
    } else if (active === "false") {
      // Inactive = endDate exists AND < today
      filter.endDate = { $lt: now };
    }

    // Date range filter (overrides startDate filter if provided)
    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) filter.startDate.$gte = new Date(startDate);
      if (endDate) filter.startDate.$lte = new Date(endDate);
    }

    const total = await MedicationModel.countDocuments(filter);

    const medications = await MedicationModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Medications fetched",
      total,
      page,
      pages: Math.ceil(total / limit),
      count: medications.length,
      filters: { active, startDate, endDate },
      data: medications,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET SINGLE MEDICATION
 */
const getMedicationById = async (req, res, next) => {
  try {
    const medication = await MedicationModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.status(200).json({
      message: "Medication fetched",
      data: medication,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE MEDICATION
 */
const updateMedication = async (req, res, next) => {
  try {
    const medication = await MedicationModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.status(200).json({
      message: "Medication updated",
      data: medication,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE MEDICATION
 */
const deleteMedication = async (req, res, next) => {
  try {
    const medication = await MedicationModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.status(200).json({
      message: "Medication deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMedication,
  getMedications,
  getMedicationById,
  updateMedication,
  deleteMedication,
};