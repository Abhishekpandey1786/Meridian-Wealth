
const path = require('path');

// Load environment variables FIRST
require('dotenv').config({
  path: path.join(__dirname, '.env')
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Environment check (never print secrets)
console.log(
  'GOOGLE_SHEET_ID:',
  process.env.GOOGLE_SHEET_ID ? 'LOADED' : 'MISSING'
);

console.log(
  'GOOGLE_CLIENT_EMAIL:',
  process.env.GOOGLE_CLIENT_EMAIL ? 'LOADED' : 'MISSING'
);

console.log(
  'GOOGLE_PRIVATE_KEY:',
  process.env.GOOGLE_PRIVATE_KEY ? 'LOADED' : 'MISSING'
);

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = (
  process.env.FRONTEND_URL || 'http://localhost:5173'
)
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin (Postman, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    }
  })
);

// Request body limit
app.use(express.json({ limit: '50kb' }));

// Rate limiting for lead submissions
app.use(
  '/api/leads',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      ok: false,
      error: 'Too many requests. Please try again later.'
    }
  })
);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'API is running',
    time: new Date().toISOString()
  });
});

// API routes
app.use('/api/leads', require('./routes/leads'));
app.use('/api', require('./routes/content'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      ok: false,
      error: 'Origin not allowed'
    });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      ok: false,
      error: 'Request body is too large'
    });
  }

  res.status(500).json({
    ok: false,
    error: 'Something went wrong. Please try again.'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
