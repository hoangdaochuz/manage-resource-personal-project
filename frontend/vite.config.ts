import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Đảm bảo server lắng nghe trên tất cả các IP
    port: 5173, // Cổng bên trong container, được ánh xạ tới 5174 trên host
  },
});
