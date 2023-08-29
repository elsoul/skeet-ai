"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsconfig = void 0;
const tsconfig = () => {
    return `{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "outDir": "dist",
    "target": "ESNext",
    "rootDir": ".",
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "lib": ["esnext"],
    "sourceMap": true,
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "compileOnSave": true,
  "include": ["src/*", "src/**/*"]
}`;
};
exports.tsconfig = tsconfig;
//# sourceMappingURL=tsconfig.json.js.map