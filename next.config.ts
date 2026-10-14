import type { NextConfig } from "next";

// Website tĩnh cho Hostinger web hosting (chỉ phục vụ HTML/CSS/JS và PHP).
// `next build` xuất toàn bộ site vào thư mục `out/`.
const nextConfig: NextConfig = {
  output: "export",
  // /microsoft-365 -> /microsoft-365/index.html, Apache phục vụ trực tiếp.
  trailingSlash: true,
  // Không có máy chủ tối ưu ảnh khi xuất tĩnh.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
