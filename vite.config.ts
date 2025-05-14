import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Example: conditionally include a plugin in development mode
    // Replace `yourDevPlugin()` with a real plugin if needed
    ...(mode === 'development' ? [] : []), // or remove this line entirely if not needed
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
