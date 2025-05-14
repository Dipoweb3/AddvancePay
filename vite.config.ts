import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import componentTagger from 'vite-plugin-component-tagger'; // Uncomment if using this plugin

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Conditionally add development plugins
    // Uncomment and replace with real plugin if needed
    // mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
