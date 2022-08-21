/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    production_url: 'https://klas-server.herokuapp.com/api',
    development_url: 'http://localhost:8000/api',
  }
}

module.exports = nextConfig
