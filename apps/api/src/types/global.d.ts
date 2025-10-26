/// <reference types="node" />

// Node.js built-in modules
declare module 'path' {
  export function join(...paths: string[]): string;
  export function resolve(...pathSegments: string[]): string;
  export function dirname(path: string): string;
  export function basename(path: string, ext?: string): string;
  export function extname(path: string): string;
  export const sep: string;
}

declare module 'fs' {
  export function existsSync(path: string): boolean;
  export function mkdirSync(path: string, options?: any): void;
  export function readFileSync(path: string, encoding?: string): string | Buffer;
  export function writeFileSync(path: string, data: any, encoding?: string): void;
}

declare module 'os' {
  export function platform(): string;
  export function arch(): string;
  export function tmpdir(): string;
}

declare module 'crypto' {
  export function randomBytes(size: number): Buffer;
  export function createHash(algorithm: string): any;
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
    interface ProcessEnv {
      [key: string]: string | undefined;
      NODE_ENV?: 'development' | 'production' | 'test';
      PORT?: string;
      DATABASE_URL?: string;
      JWT_ACCESS_SECRET?: string;
      JWT_REFRESH_SECRET?: string;
      CORS_ORIGIN?: string;
    }
    
    interface Process {
      env: ProcessEnv;
      exit(code?: number): never;
      cwd(): string;
      platform: string;
      arch: string;
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