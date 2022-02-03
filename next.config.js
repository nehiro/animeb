module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'pbs.twimg.com',
      'lh3.googleusercontent.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/myPage',
        destination: '/myPage/watched',
        permanent: true,
      },
    ];
  },
};
