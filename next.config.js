/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ohtkpydodbdmrafz.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
