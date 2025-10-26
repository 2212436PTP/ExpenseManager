import cors, { CorsOptions } from "cors";

// Default allowed origins for development and production
const defaultOrigins = [
  "http://localhost:5173", 
  "http://localhost:5174", 
  "http://localhost:3000",
  "https://expense-manager-frontend.netlify.app",
  "https://expensemanager.id.vn",
  "http://expensemanager.id.vn"
];
const envOrigins = (process.env.CORS_ORIGIN || "").split(",").map(s=>s.trim()).filter(Boolean);
const whitelist = [...defaultOrigins, ...envOrigins];

export const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return cb(null, true);
    
    // Check if origin is in whitelist
    if (whitelist.includes(origin)) {
      return cb(null, true);
    }
    
    // Log rejected origins for debugging
    console.log("CORS rejected origin:", origin);
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true
};
