import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	ssr: false,
	css: ['~/assets/css/tailwind.css'],
	vite: {
		plugins: [
			tailwindcss(),
			{
				name: 'configure-response-headers',
				configureServer: (server) => {
					server.middlewares.use((_req, res, next) => {
						res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
						res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
						next();
					});
				},
			},
		],
		optimizeDeps: {
			exclude: ['sqlocal'],
		},
		worker: {
			format: 'es',
		},
	},
});
