import sharp from 'sharp';
const resize = (path, width, height, originalName) => {
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
//# sourceMappingURL=resize.js.map