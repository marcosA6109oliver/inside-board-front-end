import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@icons": path.resolve(__dirname, "./src/assets/icons"),
            "@images": path.resolve(__dirname, "./src/assets/images"),
            "@components": path.resolve(__dirname, "./src/app/components"),
            "@auth": path.resolve(__dirname, "./src/app/components/auth"),
            "@common": path.resolve(__dirname, "./src/app/components/common"),
            "@layout": path.resolve(__dirname, "./src/app/components/layout"),
            "@pages": path.resolve(__dirname, "./src/app/pages"),
            "@redux": path.resolve(__dirname, "./src/app/redux"),
            "@reducers": path.resolve(__dirname, "./src/app/redux/reducers"),
            "@store": path.resolve(__dirname, "./src/app/store"),
            "@services": path.resolve(__dirname, "./src/app/services"),
            "@types": path.resolve(__dirname, "./src/app/types"),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "https://insideboard.com.br/backend",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
