/// <reference types="node" />

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