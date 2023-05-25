/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true
    },
    async rewrites() {
        return process.env.NEXT_PUBLIC_APP_ENV !== "development"
            ? {
                  beforeFiles: [
                      {
                          source: "/_next/:path*",
                          destination:
                              `${process.env.NEXT_PUBLIC_APP_SERVICE_BASE_URL}/onboarding/_next/:path*`,
                          basePath: false
                      }
                  ],
                  afterFiles: [
                      {
                          source: "/:host((?!onboarding).*)",
                          destination:
                              `${process.env.NEXT_PUBLIC_APP_SERVICE_BASE_URL}/onboarding/:path*`,
                          basePath: false
                      }
                  ]
              }
            : {}
    },
    basePath: process.env.NEXT_PUBLIC_APP_ENV !== "development" ? "/onboarding" : ""
}

module.exports = nextConfig