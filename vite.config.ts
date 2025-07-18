import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
import { copyFileSync, mkdirSync, existsSync, readdirSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin(), copyImagesPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}

// 复制图片资源的插件
function copyImagesPlugin(): Plugin {
  return {
    name: "copy-images",
    apply: "build",
    closeBundle() {
      const imgDir = path.resolve(__dirname, "img");
      const outDir = path.resolve(__dirname, "dist/spa");
      const outImgDir = path.join(outDir, "img");
      
      // 创建输出目录
      if (!existsSync(outImgDir)) {
        mkdirSync(outImgDir, { recursive: true });
      }
      
      // 复制所有图片文件
      const files = readdirSync(imgDir);
      files.forEach((file: string) => {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif')) {
          copyFileSync(path.join(imgDir, file), path.join(outImgDir, file));
        }
      });
    },
  };
}
