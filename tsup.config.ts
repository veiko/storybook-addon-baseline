import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/manager.tsx", "src/preview.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "css-tree",
    "react",
    "react-dom",
  ],
});