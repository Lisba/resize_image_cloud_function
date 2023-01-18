import fs from 'fs';
import sharp from 'sharp';

const resize = (path, format, width, height) => {
  const readStream = fs.createReadStream(path);
  let transform = sharp();

  if (format) {
    transform = transform.toFormat(format);
  }

  if (width || height) {
    transform = transform.resize(width, height, { fit: 'outside' });
  }

  return readStream;
};

export default resize;
