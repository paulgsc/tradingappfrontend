// vite.config.js
import { defineConfig, loadEnv } from "file:///C:/Users/pgathondu/websiteProject/client/frontend/node_modules/vite/dist/node/index.js";
import { splitVendorChunkPlugin } from "file:///C:/Users/pgathondu/websiteProject/client/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/pgathondu/websiteProject/client/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///C:/Users/pgathondu/websiteProject/client/frontend/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [react(), splitVendorChunkPlugin(), tsconfigPaths()],
    build: {
      manifest: true,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split(".").at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
            }
            return `static/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZ2F0aG9uZHVcXFxcd2Vic2l0ZVByb2plY3RcXFxcY2xpZW50XFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZ2F0aG9uZHVcXFxcd2Vic2l0ZVByb2plY3RcXFxcY2xpZW50XFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wZ2F0aG9uZHUvd2Vic2l0ZVByb2plY3QvY2xpZW50L2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCAoeyBtb2RlIH0pID0+IHtcbiAgICAvLyBMb2FkIGFwcC1sZXZlbCBlbnYgdmFycyB0byBub2RlLWxldmVsIGVudiB2YXJzXG4gICAgcHJvY2Vzcy5lbnYgPSB7IC4uLnByb2Nlc3MuZW52LCAuLi5sb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpIH1cblxuICByZXR1cm4ge1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgc3BsaXRWZW5kb3JDaHVua1BsdWdpbigpLCB0c2NvbmZpZ1BhdGhzKCldLFxuICBidWlsZDoge1xuICAgIG1hbmlmZXN0OiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIGxldCBleHRUeXBlID0gYXNzZXRJbmZvLm5hbWUuc3BsaXQoJy4nKS5hdCgxKTtcbiAgICAgICAgICBpZiAoL3BuZ3xqcGU/Z3xzdmd8Z2lmfHRpZmZ8Ym1wfGljby9pLnRlc3QoZXh0VHlwZSkpIHtcbiAgICAgICAgICAgIGV4dFR5cGUgPSAnaW1nJztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGBzdGF0aWMvJHtleHRUeXBlfS9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdYDtcbiAgICAgICAgfSxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnc3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufX0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLFNBQVMsY0FBYyxlQUFlO0FBQ3ZYLFNBQVMsOEJBQThCO0FBQ3ZDLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUkxQixJQUFPLHNCQUFRLGFBQWMsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUV2QyxVQUFRLE1BQU0sRUFBRSxHQUFHLFFBQVEsS0FBSyxHQUFHLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBRWxFLFNBQU87QUFBQSxJQUNQLFNBQVMsQ0FBQyxNQUFNLEdBQUcsdUJBQXVCLEdBQUcsY0FBYyxDQUFDO0FBQUEsSUFDNUQsT0FBTztBQUFBLE1BQ0wsVUFBVTtBQUFBLE1BQ1YsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCLENBQUMsY0FBYztBQUM3QixnQkFBSSxVQUFVLFVBQVUsS0FBSyxNQUFNLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDNUMsZ0JBQUksa0NBQWtDLEtBQUssT0FBTyxHQUFHO0FBQ25ELHdCQUFVO0FBQUEsWUFDWjtBQUNBLG1CQUFPLFVBQVU7QUFBQSxVQUNuQjtBQUFBLFVBQ0EsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
