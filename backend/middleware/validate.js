
const { z } = require('zod');

const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(7).max(20),

  city: z.string().trim().max(80).optional().default(''),
  state: z.string().trim().max(60).optional().default(''),

  investableAssets: z.string().trim().min(1).max(60),

  servicesInterested: z.array(
    z.string().max(60)
  ).max(10).default([]),

  hasAdvisor: z.enum(['Yes', 'No']),

  previousInvestments: z.array(
    z.string().max(60)
  ).max(15).default([]),

  previousInvestmentsDetails: z.string()
    .trim().max(1000).optional().default(''),

  message: z.string()
    .trim().max(2000).optional().default(''),

  consent: z.literal(true),

  website: z.string().max(0).optional(),

  utm: z.record(
    z.string(),
    z.string().max(200)
  ).optional().default({})
});

module.exports = (req, res, next) => {
  const parsed = leadSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: 'Please check the form fields.',
      details: parsed.error.flatten().fieldErrors
    });
  }

  req.lead = parsed.data;
  next();
};
