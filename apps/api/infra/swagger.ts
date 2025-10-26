import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const posix = (p: string) => p.replace(/\\/g, "/");
const CWD = process.cwd();

const ROUTES_GLOBS = [
  posix(path.join(CWD, "src/routes/**/*.ts")),
  posix(path.join(CWD, "src/routes/**/*.js")),
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
  const pathsCount = spec?.paths ? Object.keys(spec.paths).length : 0;
  console.log("[swagger] globs:", ROUTES_GLOBS);
  console.log("[swagger] paths:", pathsCount);

  app.get("/docs-json", (_req, res) => res.json(spec));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
}
