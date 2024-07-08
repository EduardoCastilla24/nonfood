import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://EduardoCastilla24.github.io',
  base: '/profundidad-nonfood',
  integrations: [tailwind()]
});