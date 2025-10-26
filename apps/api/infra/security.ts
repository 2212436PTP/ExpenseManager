import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Express } from "express";

export function applySecurity(app: Express) {
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

  app.use(
    cors({
      origin: ["http://localhost:5173"], // thêm domain FE khi deploy
      credentials: true,
    })
  );

  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
}
