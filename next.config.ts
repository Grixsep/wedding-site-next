/** @type {import('next').NextConfig} */
const nextConfig = {
  // tell Next/Image it’s OK to fetch from your Cloudinary account
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        // allow any image under your cloud name
        // upload/<folder>/<public_id>.<ext>
        pathname: "/wedding-ledewhurst/image/upload/**",
      },
    ],
  },
};

module.exports = nextConfig;
