/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.watchOptions = {
      ignored: ['**/node_modules', '**/C:/Users/ACER/Application Data/**']
    };
    return config;
  },
};

export default nextConfig;
