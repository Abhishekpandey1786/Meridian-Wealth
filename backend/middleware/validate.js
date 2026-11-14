
const { z } = require('zod');

const stringArray = (maxItems = 30, maxLength = 100) =>
  z.array(
    z.string().trim().min(1).max(maxLength)
  ).max(maxItems).default([]);

const leadSchema = z.object({

  firstName: z.string()
    .trim()
    .min(1)
    .max(60),

  lastName: z.string()
    .trim()
    .min(1)
    .max(60),

  email: z.string()
    .trim()
    .email()
    .max(120),

  phone: z.string()
    .trim()
    .min(7)
    .max(20),

  city: z.string()
    .trim()
    .max(80)
    .optional()
    .default(''),

  state: z.string()
    .trim()
    .max(60)
    .optional()
    .default(''),

  investableAssets: z.string()
    .trim()
    .min(1)
    .max(60),

  servicesInterested: stringArray(12, 60),

  hasAdvisor: z.enum(['Yes', 'No']),

  previousInvestments: stringArray(30, 80),

  // Crypto
  cryptoPlatforms: stringArray(20),

  // Stocks, ETFs and brokerages
  brokeragePlatforms: stringArray(20),

  // Banks and savings
  bankPlatforms: stringArray(20),

  // Retirement providers
  retirementPlatforms: stringArray(20),

  // Treasury providers
  treasuryPlatforms: stringArray(20),

  // Real estate providers
  realEstatePlatforms: stringArray(20),

  // Insurance providers
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
    return res.status(400).json({
      ok: false,
      error: 'Please check the form fields.',
      details: parsed.error.flatten().fieldErrors
    });
  }

  req.lead = parsed.data;

  next();
};
