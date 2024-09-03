/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    ppr: true,
    reactOwnerStack: true,
  },
}

module.exports = nextConfig
