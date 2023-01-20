import sharp from 'sharp';

const resize = (path: string, width: number, height: number, originalName: string) => {
  try {
    return sharp(path)
      .resize(width, height, { fit: 'outside' })
      .toFile(`${originalName}`)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  } catch (error) {
    throw error;
  }
};

export default resize;
