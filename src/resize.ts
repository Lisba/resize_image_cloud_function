import sharp from 'sharp';

const resize = (path: string, width: number, height: number, originalName: string) => {
  return sharp(path)
    .resize(width, height, { fit: 'outside' })
    .toFile(`${originalName}`)
    .catch((err) => {
      console.error(err);
    });
};

export default resize;
