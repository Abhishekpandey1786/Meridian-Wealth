
const router = require('express').Router();

const validate = require('../middleware/validate');
const { appendLead } = require('../services/googleSheets');

// Honeypot middleware
function honeypot(req, res, next) {
  if (req.body?.website) {
    return res.status(200).json({
      ok: true,
      message: 'Thank you!'
    });
  }

  next();
}

// Submit lead
router.post(
  '/',
  honeypot,
  validate,
  async (req, res, next) => {

    try {

      await appendLead(req.lead);

      return res.status(201).json({
        ok: true,
        message: 'Thank you! An advisor will contact you shortly.'
      });

    } catch (error) {
      next(error);
    }

  }
);

module.exports = router;
