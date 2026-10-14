import type { NextConfig } from "next";

// Website chạy bằng máy chủ Next.js (`next build` rồi `next start`) trên Mắt Bão Vibe Host.
const nextConfig: NextConfig = {
  // /microsoft-365 -> /microsoft-365/, giữ đường dẫn thống nhất cho SEO.
  trailingSlash: true,
  // Ảnh trong site là logo PNG nhỏ; không cần tối ưu ảnh trên máy chủ.
  images: { unoptimized: true },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // www.dvai.vn -> dvai.vn
        source: "/:path*",
        has: [{ type: "host", value: "www.dvai.vn" }],
        destination: "https://dvai.vn/:path*",
        permanent: true,
      },
    ];
  },
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
