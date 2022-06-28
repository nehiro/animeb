export const Site = () => {
  console.log(
    process.env.NEXT_PUBLIC_PROD,
    'process.env.NEXT_PUBLIC_PROD SITE'
  );
  if (process.env.NEXT_PUBLIC_PROD) {
    return { origin: 'https://anime-club.online/' };
  } else {
    return { origin: 'http://localhost:3000' };
  }
};
