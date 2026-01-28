const AppointmentModel = require("../models/Appointment");

/**
 * CREATE APPOINTMENT
 */
const createAppointment = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.create({
      userId: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      message: "Appointment created",
      data: appointment,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET ALL APPOINTMENTS (PAGINATED + FILTERED)
 */
const getAppointments = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { fromDate, toDate, doctorName } = req.query;

    const filter = { userId: req.user._id };

    // Date range filter
    if (fromDate || toDate) {
      filter.date = {};
      if (fromDate) filter.date.$gte = new Date(fromDate);
      if (toDate) filter.date.$lte = new Date(toDate);
    }

    // Doctor name search
    if (doctorName) {
      filter.doctorName = { $regex: doctorName, $options: "i" };
    }

    const total = await AppointmentModel.countDocuments(filter);

    const appointments = await AppointmentModel.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: "Appointments fetched",
      total,
      page,
      pages: Math.ceil(total / limit),
      count: appointments.length,
      filters: { fromDate, toDate, doctorName },
      data: appointments,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET SINGLE APPOINTMENT
 */
const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment fetched",
      data: appointment,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * UPDATE APPOINTMENT
 */
const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment updated",
      data: appointment,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE APPOINTMENT
 */
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};