// ✅ Include ALL .svg and .webp files inside /src/assets and ANY subfolder
const images = import.meta.glob('/src/assets/**/*.{svg,webp}', { eager: true });

// ✅ Universal helper
// const getAsset = (folder, pathURL, ext) => {
//   const cleanPath = pathURL.replace(/^\/+/, '');
//   const key = `/src/assets/${folder ? folder + '/' : ''}${cleanPath}.${ext}`;
//   return images[key]?.default || '';
// };

// ✅ Exported helpers
export const getColdwebp = (pathURL) => {
  return `https://res.cloudinary.com/djw3rcz4j/image/upload/v1771943194/${pathURL}.webp`;  
};
export const getImagewebp = (pathURL) => {
  const cleanPath = pathURL.replace(/^\/+/, ''); // remove leading slash
  const key = `/src/assets/${cleanPath}.webp`;  
  return images[key]?.default || '';
};
export const getImageSvg = (pathURL) => {
  const cleanPath = pathURL.replace(/^\/+/, '');
  return `/svg/${cleanPath}.svg`;
};
export const getPDF = (pathURL) => {
  const cleanPath = pathURL.replace(/^\/+/, '');
  return `/src/assets/docs-pdf/${cleanPath}`;
};