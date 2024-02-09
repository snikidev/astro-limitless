import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [react(), tailwind()]
});