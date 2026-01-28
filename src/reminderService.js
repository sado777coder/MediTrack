const AppointmentModel = require("./models/Appointment");

/**
 * Get upcoming appointments in the next `minutesAhead` minutes
 * @param {number} minutesAhead
 */
const getUpcomingAppointments = async (minutesAhead = 60) => {
  const now = new Date();
  const upcomingTime = new Date(Date.now() + minutesAhead * 60 * 1000);

  return await AppointmentModel.find({
    status: "scheduled",
    appointmentDateTime: {
      $gte: now,
      $lte: upcomingTime,
    },
  })
    .populate("userId", "name email") // get user info for notifications
    .sort({ appointmentDateTime: 1 }); // soonest first
};

module.exports = {
  getUpcomingAppointments,
};