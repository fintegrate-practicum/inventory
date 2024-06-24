// import React, { useState } from 'react';
// import { ImageSlider, ImageListItem } from '@mui/material';

// // Assuming product.componentsImages is an array of image URLs or objects
// export default function ProductImageCarousel({ product }: { product: { componentsImages: string[] | { src: string; alt?: string }[] } }) {
//   const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

//   const handleNextImage = () => {
//     const newIndex = (activeImageIndex + 1) % product.componentsImages.length;
//     setActiveImageIndex(newIndex);
//   };

//   const handlePreviousImage = () => {
//     const newIndex =
//       (activeImageIndex - 1 + product.componentsImages.length) %
//       product.componentsImages.length;
//     setActiveImageIndex(newIndex);
//   };

//   return (
//     <ImageSlider
//       images={product.componentsImages.map((image) => ({ src: image.src || image }))}
//       activeIndex={activeImageIndex}
//       onChange={(event, newIndex) => setActiveImageIndex(newIndex)}
//     >
//       {({ image, index }) => (
//         <ImageListItem key={index}>
//           <img
//             src={image.src}
//             alt={image.alt || 'Product Image'}
//             style={{ width: '100%', height: 'auto' }}
//           />
//         </ImageListItem>
//       )}
//     </ImageSlider>
//   );
// }
