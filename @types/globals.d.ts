// Minimal ambient declarations so `process` is available to TypeScript
// This avoids requiring `@types/node` in production build environments
declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
  }
}

declare var process: {
  env: NodeJS.ProcessEnv;
  exit: (code?: number) => never;
  cwd?: () => string;
  // keep it minimal; add more if needed later
};

export {};
