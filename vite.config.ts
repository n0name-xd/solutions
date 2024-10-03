/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9001,
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
