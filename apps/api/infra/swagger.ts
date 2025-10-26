import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const posix = (p: string) => p.replace(/\\/g, "/");
const CWD = process.cwd();

const ROUTES_GLOBS = [
  posix(path.join(CWD, "src/routes/**/*.ts")),
  posix(path.join(CWD, "src/routes/**/*.js")),
  posix(path.join(__dirname, "../src/routes/**/*.ts")),
  posix(path.join(__dirname, "../src/routes/**/*.js")),
];

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Expense Manager API", version: "1.0.0", description: "API cho hệ thống quản lý chi tiêu" },
    servers: [
      { url: "http://localhost:4000/api", description: "Development server" },
      { url: "https://expense-manager-api-a74b.onrender.com/api", description: "Production server" }
    ],
    components: {
      securitySchemes: { BearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
      schemas: {
        LoginReq: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "user@example.com" },
            password: { type: "string", example: "user12345" },
          },
        },
        RegisterReq: {
          type: "object",
          required: ["fullName", "email", "password"],
          properties: {
            fullName: { type: "string", example: "Nguyen Van A" },
            email: { type: "string", example: "new@example.com" },
            password: { type: "string", example: "secret123" },
          },
        },
        BudgetCreate: {
          type: "object",
          required: ["month", "year", "limitAmount"],
          properties: {
            month: { type: "integer", example: 10, minimum: 1, maximum: 12 },
            year: { type: "integer", example: 2025, minimum: 2000 },
            limitAmount: { type: "number", example: 5000000, minimum: 0 },
            categoryId: { type: "string", nullable: true },
          },
        },
        BudgetUpdate: { allOf: [{ $ref: "#/components/schemas/BudgetCreate" }] },
        TxCreate: {
          type: "object",
          required: ["type", "amount", "occurredAt", "accountId"],
          properties: {
            type: { type: "string", enum: ["INCOME", "EXPENSE"] },
            amount: { type: "number", example: 150000, minimum: 0 },
            occurredAt: { type: "string", format: "date-time" },
            accountId: { type: "string" },
            note: { type: "string" },
            categoryId: { type: "string", nullable: true },
          },
        },
        TxUpdate: { allOf: [{ $ref: "#/components/schemas/TxCreate" }] },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ROUTES_GLOBS,
};

const spec: any = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  try {
    const pathsCount = spec?.paths ? Object.keys(spec.paths).length : 0;
    console.log("[swagger] globs:", ROUTES_GLOBS);
    console.log("[swagger] paths:", pathsCount);

    // Always provide raw spec endpoint (may be empty)
    app.get("/docs-json", (_req, res) => res.json(spec ?? {}));

    // If spec has paths, mount Swagger UI; otherwise serve a fallback page.
    // Also ensure both '/docs' and '/docs/' are handled.
    app.get("/docs", (req, res, next) => {
      if (pathsCount > 0) return next();
      res.type('html').send(`
        <html>
          <head><title>API Documentation</title></head>
          <body style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:32px;">
            <h1>Expense Manager API</h1>
            <p>API Documentation is not available yet. You can use the raw OpenAPI spec or check health.</p>
            <ul>
              <li><a href="/api/health">Health Check</a></li>
              <li><a href="/docs-json">Raw OpenAPI Spec</a></li>
            </ul>
          </body>
        </html>
      `);
    });

    app.get("/docs/", (req, res, next) => {
      // redirect to /docs so both variants work
      res.redirect(302, '/docs');
    });

    if (pathsCount > 0) {
      // mount swagger UI (this will handle assets and index)
      app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
    }

  } catch (err) {
    console.error('[swagger] failed to setup swagger UI', err);
    // Ensure docs endpoints exist even when an error occurs
    app.get("/docs-json", (_req, res) => res.json({}));
    app.get("/docs", (_req, res) => {
      res.type('html').send(`<html><body><h1>Expense Manager API</h1><p>Documentation temporarily unavailable.</p><p><a href="/api/health">Health Check</a></p></body></html>`);
    });
  }
}
