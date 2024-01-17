/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hspkddatcbjensjorakh.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
