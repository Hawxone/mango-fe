/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains : ['images.pexels.com','localhost',"flowbite.s3.amazonaws.com","cdn.dimasblog.my.id","72ca95a06799d7355825a63dce46008b.r2.cloudflarestorage.com"],
    minimumCacheTTL:200
  }
}

module.exports = nextConfig
