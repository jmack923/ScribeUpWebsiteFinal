import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { execSync } from "node:child_process";

function safeGitSha() {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "";
  }
}

const buildSha =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.COMMIT_SHA ||
  safeGitSha() ||
  "";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwind()],
  resolve: {
    // Use Iconify offline build everywhere to avoid runtime network fetches.
    alias: [{ find: /^@iconify\/react$/, replacement: "@iconify/react/dist/offline" }],
  },
  define: {
    __BUILD_SHA__: JSON.stringify(buildSha ? buildSha.slice(0, 7) : "dev"),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          const nm = `${"node_modules"}/`;

          if (id.includes(`${nm}@iconify/`)) return "vendor-icons";
          if (id.includes(`${nm}@heroui/`)) return "vendor-ui";
          if (id.includes(`${nm}framer-motion/`)) return "vendor-motion";
          if (id.includes(`${nm}recharts/`) || id.includes(`${nm}d3-`)) return "vendor-charts";
          if (id.includes(`${nm}react-router/`) || id.includes(`${nm}react-router-dom/`)) return "vendor-router";
          if (id.includes(`${nm}react/`) || id.includes(`${nm}react-dom/`) || id.includes(`${nm}scheduler/`)) return "vendor-react";

          return "vendor";
        },
      },
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5500,
    strictPort: true,
    // Prevent stale bundles/CSS in aggressive browser caches while iterating locally.
    headers: {
      "Cache-Control": "no-store",
    },
  },
});
