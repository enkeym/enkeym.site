import withBundleAnalyzer from "@next/bundle-analyzer"
import type { NextConfig } from "next"

const isAnalyze = process.env.ANALYZE === "true"

const baseConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  compress: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enkeym.store",
        pathname: "/images/**"
      }
    ]
  },
  modularizeImports: {
    three: {
      transform: "three/src/{{member}}"
    }
  }
}

export default withBundleAnalyzer({ enabled: isAnalyze })(baseConfig)
