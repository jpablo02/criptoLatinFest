// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gateway.lighthouse.storage",
      },
    ],
  },
};
