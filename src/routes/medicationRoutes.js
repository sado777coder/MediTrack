const express = require("express");
const router = express.Router();

const requireAuth = require("../middlewares/requireAuth");
const validate = require("../middlewares/validate");

const {
  createMedication,
  getMedications,
  updateMedication,
  deleteMedication,
} = require("../controllers/medicationController");

const {
  createMedicationValidator,
  updateMedicationValidator,
} = require("../validators/medicationValidator");

router.use(requireAuth);

router.post("/", validate(createMedicationValidator), createMedication);
router.get("/", getMedications);
router.put("/:id", validate(updateMedicationValidator), updateMedication);
router.delete("/:id", deleteMedication);

module.exports = router;