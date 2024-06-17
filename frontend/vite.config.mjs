import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    reporters: [
      "default",
      ["junit", { outputFile: "./reports/tests/junit.xml" }],
    ],
    css: true,
    coverage: {
      provider: "istanbul",
      reportsDirectory: "./reports/coverage",
      reporter: [["cobertura", { file: "cobertura.xml" }]],
    },
  },
});
