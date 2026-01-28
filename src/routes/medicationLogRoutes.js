const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const validate = require("../middlewares/validate");

const {
  createMedicationLog,
  getMedicationLogs,
  updateMedicationLog,
} = require("../controllers/medicationLogController");

const {
  createMedicationLogValidator,
  updateMedicationLogValidator,
} = require("../validators/medicationLogValidator");

router.use(requireAuth);

router.post("/", validate(createMedicationLogValidator), createMedicationLog);
router.get("/", getMedicationLogs);
router.put("/:id", validate(updateMedicationLogValidator), updateMedicationLog);

module.exports = router;