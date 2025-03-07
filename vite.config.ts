import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';
import fs from 'fs';

function raw_fonts(ext: string[]) {
	return {
		name: 'vite-plugin-raw-fonts',
		transform(_code: string, id: string) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return { code: `export default ${JSON.stringify(buffer)}`, map: null };
			}
		},
	};
}

function coep_plugin(): Plugin {
	return {
		name: 'cross-origin-plugin',
		configureServer(server) {
			server.middlewares.use((_, res, next) => {
				res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
				res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
				next();
			});
		},
		configurePreviewServer(server) {
			server.middlewares.use((_, res, next) => {
				res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
				res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
				next();
			});
		},
	};
}

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			customCollections: {
				'material-icon-theme': FileSystemIconLoader('./node_modules/material-icon-theme/icons'),
				'r-icons': FileSystemIconLoader('./src/lib/icons/Rinconx64_r-icons'),
				sveltelab: FileSystemIconLoader('./src/lib/icons/sveltelab'),
			},
		}),
		visualizer({
			emitFile: true,
			filename: 'stats.html',
		}),
		raw_fonts(['.ttf']),
		coep_plugin(),
	],
	define: {
		'process.env.NODE_ENV': '"production"',
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
