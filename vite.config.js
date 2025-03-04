import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "import.meta.env.VITE_RAPID_API_KEY": JSON.stringify(env.VITE_RAPID_API_KEY),
      "import.meta.env.VITE_RAPID_API_HOST": JSON.stringify(env.VITE_RAPID_API_HOST),
      "import.meta.env.VITE_BASE_URL": JSON.stringify(env.VITE_BASE_URL),
    },
  };
});
