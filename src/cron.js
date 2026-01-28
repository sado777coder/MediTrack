const cron = require("node-cron");
const { getUpcomingAppointments } = require("./reminderService");

// Run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  try {
    const upcomingAppointments = await getUpcomingAppointments(60); // next 60 minutes

    upcomingAppointments.forEach((appt) => {
      console.log(
        `Reminder: ${appt.userId.name} has an appointment at ${appt.appointmentDateTime}`
      );
      // Here you can integrate email/SMS sending, e.g., Nodemailer or Twilio
    });
  } catch (err) {
    console.error("Error fetching reminders:", err);
  }
});