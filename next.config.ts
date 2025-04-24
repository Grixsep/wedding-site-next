/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next.js which external image sources are allowed
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "share.icloud.com",
        port: "",
        // allow any path under /photos/, change if you store elsewhere
        pathname: "/photos/**",
      },
      // Example: to also allow imgur
      // {
      //   protocol: "https",
      //   hostname: "i.imgur.com",
      //   port: "",
      //   pathname: "/**",
      // },
    ],
    // If you ever need to completely opt‐out of optimization for some images,
    // you can pass `unoptimized` to the <Image> component:
    // <Image src={url} unoptimized ... />
  },

  // any other Next.js settings you already have…
  // experimental: { ... },
  // reactStrictMode: true,
};

module.exports = nextConfig;
