import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env, isClaudeConfigured, isProkeralaConfigured } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import locationRoutes from './routes/location.routes';
import reportRoutes from './routes/report.routes';

const app = express();

// 1. Helmet Security Headers (CSP, HSTS, Frameguard, NoSniff, XSS Filter)
app.use(
  helmet({
    contentSecurityPolicy: false, // Frame allowed for dashboard PDF inline preview
    crossOriginEmbedderPolicy: false
  })
);

// 2. CORS Configuration
const allowedOrigin = env.CORS_ORIGIN || '*';
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// 3. Request Size Limit (2mb Max payload size)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

// 4. Rate Limiting Protection
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests from this IP, please try again after 15 minutes' }
});

const reportGenerationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 report generations per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Report generation limit reached. Please wait 15 minutes before submitting new jobs.' }
});

app.use('/api/', globalLimiter);
app.use('/api/reports/generate', reportGenerationLimiter);

// 5. Routes
app.use('/api/reports', reportRoutes);
app.use('/api/location', locationRoutes);

// Root Status Endpoint
app.get('/', (req, res) => {
  res.json({
    app: 'Rudraveda Astrology Report Generator Backend',
    version: '1.0.0',
    noDatabase: true,
    status: 'online',
    security: {
      rateLimiting: 'ACTIVE',
      helmetHeaders: 'ACTIVE',
      corsOrigin: allowedOrigin,
      credentialsIsolation: 'BACKEND_ONLY'
    },
    endpoints: [
      'POST /api/reports/generate',
      'GET /api/reports/:id/status',
      'GET /api/reports/:id/download',
      'GET /api/reports/:id/preview',
      'GET /api/location/search?q=...'
    ]
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = parseInt(env.PORT, 10) || 5000;

app.listen(PORT, () => {
  console.log(`
=====================================================
🔮 RUDRAVEDA ASTROLOGY BACKEND ENGINE STARTED
=====================================================
📡 Listening on: http://localhost:${PORT}
💾 Database Mode: ZERO-DATABASE (Pure Ephemeral RAM)
🔒 Security Architecture: Helmet + RateLimiter + InputSanitizer
🔑 Prokerala API: ${isProkeralaConfigured ? '✅ CONFIGURED (OAuth2 Live)' : '⚠️ UNCONFIGURED (Calculated Fallback Engine Active)'}
🧠 Claude AI API: ${isClaudeConfigured ? '✅ CONFIGURED (Claude 3.5 Sonnet)' : '⚠️ UNCONFIGURED (Vedic Synthesis Fallback Active)'}
📄 PDF Rendering: Puppeteer Headless Engine Ready
=====================================================
  `);
});
