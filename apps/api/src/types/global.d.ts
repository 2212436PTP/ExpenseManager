/// <reference types="node" />

// Node.js modules
declare module 'path';
declare module 'fs';
declare module 'os';
declare module 'crypto';

// Ensure Node.js globals are available
declare const console: Console;
declare const process: NodeJS.Process;
declare const __dirname: string;
declare const __filename: string;
declare const require: NodeRequire;
declare const setInterval: typeof global.setInterval;
declare const clearInterval: typeof global.clearInterval;
declare const setTimeout: typeof global.setTimeout;
declare const clearTimeout: typeof global.clearTimeout;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      DATABASE_URL: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      CORS_ORIGIN: string;
      UPLOAD_DIR: string;
      LOG_LEVEL?: string;
    }
  }
}

export {};