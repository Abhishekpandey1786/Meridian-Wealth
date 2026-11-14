
const { z } = require('zod');

const stringArray = (maxItems = 30, maxLength = 100) =>
  z.array(
    z.string().trim().min(1).max(maxLength)
  )
    .max(maxItems)
    .optional()
    .default([]);

const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(60),
  lastName: z.string().trim().min(1).max(60),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(7).max(20),

  city: z.string().trim().max(80).optional().default(''),
  state: z.string().trim().max(60).optional().default(''),

  investableAssets: z.string().trim().min(1).max(60),

  servicesInterested: stringArray(12, 60),

  hasAdvisor: z.enum(['Yes', 'No']),

  previousInvestments: stringArray(60, 100),

  cryptoPlatforms: stringArray(20),
  brokeragePlatforms: stringArray(20),
  bankPlatforms: stringArray(20),
  retirementPlatforms: stringArray(20),
  treasuryPlatforms: stringArray(20),
  realEstatePlatforms: stringArray(20),
  insurancePlatforms: stringArray(20),

  previousInvestmentsDetails: z.string()
    .trim()
    .max(1000)
    .optional()
    .default(''),

  message: z.string()
    .trim()
    .max(2000)
    .optional()
    .default(''),

  consent: z.literal(true),

  website: z.string()
    .max(0)
    .optional()
    .default(''),

  utm: z.record(
    z.string(),
    z.string().max(200)
  ).optional().default({})

}).strict();

module.exports = (req, res, next) => {
  const parsed = leadSchema.safeParse(req.body);

  if (!parsed.success) {
    console.error(
      'LEAD VALIDATION ERROR:',
      JSON.stringify(parsed.error.issues, null, 2)
    );

    return res.status(400).json({
      ok: false,
      error: 'Please check the form fields.',
      details: parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  req.lead = parsed.data;
  next();
};
