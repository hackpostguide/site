import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/a/**',
        },
        {
          protocol: 'https',
          hostname: 'www.hackpost.guide',
          port: '',
          pathname: '/partners/**',
        },
        {
          protocol: 'https',
          hostname: 'hackathon.hackpost.guide',
          port: '',
          pathname: '/**',
        },
      ],
    },
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  }

  const withMDX = createMDX({
    // Add markdown plugins here, as desired
  })
  
  export default withMDX(nextConfig)