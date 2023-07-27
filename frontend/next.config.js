/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
        port: "",
      },
    ],
  },
};

// module.exports = withTM(["../shared"])(nextConfig);
module.exports = nextConfig;
