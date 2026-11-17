import type { NextConfig } from "next";

// Versão para hospedagem estática (Hostinger, public_html).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
