import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    base: '/website/',
    plugins: [react()],
    server: {
        proxy: {
            '/feed': {
                target: 'https://medium.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/feed/, '/feed')
            }
        }
    }
});
