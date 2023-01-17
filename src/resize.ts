import sharp from 'sharp';

const resize = (path: string, width: number, height: number, originalName: string) => {
  sharp(path)
    .resize(width, height)
    .toFile(`${originalName}`)
    .then((data) => {
      console.log('successful', data);
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export default resize;
