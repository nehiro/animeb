export const Site = () => {
  // console.log(
  //   process.env.NEXT_PUBLIC_PROD,
  //   'process.env.NEXT_PUBLIC_PROD SITE'
  // );
  // return { origin: 'https://anime-club.online/' };
  // return { origin: 'https://anime-club.online/' };
  if (process.env.NEXT_PUBLIC_PROD === 'true') {
    // console.log('本番');
    return { origin: 'https://anime-club.online' };
  } else {
    // console.log('開発');
    return { origin: 'http://localhost:3000' };
  }
};
// export const Site = {
//   // origin: 'https://anime-club.online'
//   origin: 'http://localhost:3000',
// };
