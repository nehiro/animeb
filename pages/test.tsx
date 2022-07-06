import React from 'react';

const test = () => {
  const loadImage = (src: any) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  };

  // promise then/catch
  loadImage('images/about.png')
    .then((res) => {
      console.log(res.width, res.height);
    })
    .catch((e) => {
      console.log('onload error', e);
    });

  // async/awaith
  async () => {
    try {
      const res = await loadImage('images/about.png');
      console.log(res.width, res.height);
    } catch (e) {
      console.log('onload error', e);
    }
  };
  return <div>test</div>;
};

export default test;
