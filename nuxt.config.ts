import tailwindcss from '@tailwindcss/vite';
import sqlocal from 'sqlocal/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	ssr: false,
	css: ['~/assets/css/tailwind.css'],
	vite: { plugins: [tailwindcss(), sqlocal()] },
});
