
const router = require('express').Router();

const validate = require('../middleware/validate');
const { appendLead } = require('../services/googleSheets');

router.post('/', validate, async (req, res, next) => {
  try {
    // Honeypot: silently reject bot submissions
    if (req.body.website) {
      return res.status(200).json({
        ok: true,
        message: 'Thank you!'
      });
    }

    await appendLead(req.lead);

    res.status(201).json({
      ok: true,
      message: 'Thank you! An advisor will contact you shortly.'
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
