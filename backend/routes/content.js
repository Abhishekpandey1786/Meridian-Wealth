
const router = require('express').Router();
const c = require('../data/content');

router.get('/services', (req, res) => {
  res.json({
    ok: true,
    data: c.services
  });
});

router.get('/faqs', (req, res) => {
  res.json({
    ok: true,
    data: c.faqs
  });
});

router.get('/testimonials', (req, res) => {
  res.json({
    ok: true,
    data: c.testimonials
  });
});

module.exports = router;
