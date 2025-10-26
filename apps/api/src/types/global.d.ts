/// <reference types="node" />

// Node.js built-in modules
declare module 'path' {
  export = import('path');
}
declare module 'fs' {
  export = import('fs');
}
declare module 'os' {
  export = import('os');
}
declare module 'crypto' {
  export = import('crypto');
}

// Global Node.js variables
declare global {
  const console: Console;
  const process: NodeJS.Process;
  const __dirname: string;
  const __filename: string;
  const require: NodeRequire;
  const setInterval: typeof global.setInterval;
  const clearInterval: typeof global.clearInterval;
  const setTimeout: typeof global.setTimeout;
  const clearTimeout: typeof global.clearTimeout;
  
  namespace NodeJS {
    interface Process {
      env: ProcessEnv;
    }
    interface ProcessEnv {
      [key: string]: string | undefined;
    }
  }
}

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