// import React, { useState, useEffect } from 'react';
// import './custom.slider.css';

// interface Slide {
//   // Define the properties of your carousel items here
//   // (e.g., image URL, caption, etc.)
// }

// type ActiveIndexType = number | null; // Explicitly define the allowed type for activeIndex

// function CustomCarousel({ children }: { children: React.ReactNode[] }) {
//   const [activeIndex, setActiveIndex] = useState<ActiveIndexType>(0);
//   const [slideDone, setSlideDone] = useState(true);
//   const [timeID, setTimeID] = useState<number | null>(null);

// //   useEffect(() => {
// //     if (slideDone) {
// //       setSlideDone(false);
// //       setTimeID(
// //         setTimeout(() => {
// //           slideNext();
// //           setSlideDone(true);
// //         }, 5000)
// //       );
// //     }
// //   }, [slideDone]);

//   const slideNext = () => {
//     setActiveIndex((val) => {
//       if (val === children.length - 1) {
//         return 0;
//       } else if (val !== null) { // Ensure val is not null before incrementing
//         return val + 1;
//       } else {
//         return 0; // Default to first slide if no active index set
//       }
//     });
//   };

//   const slidePrev = () => {
//     setActiveIndex((val) => {
//       if (val === 0) {
//         return children.length - 1;
//       } else if (val !== null) { // Ensure val is not null before decrementing
//         return val - 1;
//       } else {
//         return children.length - 1; // Default to last slide if no active index set
//       }
//     });
//   };

//   const AutoPlayStop = () => {
//     if (timeID !== null) {
//       clearTimeout(timeID);
//       setSlideDone(false);
//     }
//   };

//   const AutoPlayStart = () => {
//     if (!slideDone) {
//       setSlideDone(true);
//     }
//   };

//   return (
//     <div
//       className="container__slider"
//       onMouseEnter={AutoPlayStop}
//       onMouseLeave={AutoPlayStart}
//     >
//       {children.map((item, index) => {
//         return (
//           <div
//             className={
//                 activeIndex !== null
//              ? `slider__item slider__item-active-${activeIndex + 1}`
//              : ''
//             }
//             key={index}
//           >
//             {item}
//           </div>
//         );
//       })}

//       <div className="container__slider__links">
//         {children.map((item, index) => {
//           return (
//             <button
//               key={index}
//               className={
//                 activeIndex === index
//                   ? "container__slider__links-small container__slider__links-small-active"
//                   : "container__slider__links-small"
//               }
//               onClick={(e) => {
//                 e.preventDefault();
//                 setActiveIndex(index);
//               }}
//             ></button>
//           );
//         })}
//       </div>

//       <button className="slider__btn-next" onClick={(e) => {
//         e.preventDefault();
//         slideNext();
//       }}>
//         {'>'}
//       </button>
//       <button className="slider__btn-prev" onClick={(e) => {
//         e.preventDefault();
//         slidePrev();
//       }}>
//         {'<'}
//       </button>
//     </div>
//   );
// }

// export default CustomCarousel;


import React, { useState } from "react";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageViewer = () => {
    const [images, setImages] = useState([
        {
          id: 1,
          title: 'Bluetooth Headset',
          link: '#product-card-1', 
          image: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
          price: 2900,
          currency: 'THB',
          stock: 7,
        },
        {
          id: 2,
          title: 'Wireless Earbuds',
          link: '#product-card-2',
          image: 'https://placeimg.com/640/480/tech/grayscale',
          price: 1800,
          currency: 'THB',
          stock: 15,
        },
        {
          id: 3,
          title: 'Bluetooth Headset',
          link: '#product-card-1', 
          image: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
          price: 2900,
          currency: 'THB',
          stock: 7,
        },
        {
          id: 4,
          title: 'Wireless Earbuds',
          link: '#product-card-2',
          image: 'https://placeimg.com/640/480/tech/grayscale',
          price: 1800,
          currency: 'THB',
          stock: 15,
        },
        {
          id: 5,
          title: 'Bluetooth Headset',
          link: '#product-card-1',
          image: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
          price: 2900,
          currency: 'THB',
          stock: 7,
        },
        {
          id: 6,
          title: 'Wireless Earbuds',
          link: '#product-card-2',
          image: 'https://placeimg.com/640/480/tech/grayscale',
          price: 1800,
          currency: 'THB',
          stock: 15,
        },
        {
            id: 1,
            title: 'Bluetooth Headset',
            link: '#product-card-1', 
            image: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
            price: 2900,
            currency: 'THB',
            stock: 7,
          },
          {
            id: 2,
            title: 'Wireless Earbuds',
            link: '#product-card-2',
            image: 'https://placeimg.com/640/480/tech/grayscale',
            price: 1800,
            currency: 'THB',
            stock: 15,
          },
          {
            id: 3,
            title: 'Bluetooth Headset',
            link: '#product-card-1', 
            image: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
            price: 2900,
            currency: 'THB',
            stock: 7,
          },
          {
            id: 4,
            title: 'Wireless Earbuds',
            link: '#product-card-2',
            image: 'https://placeimg.com/640/480/tech/grayscale',
            price: 1800,
            currency: 'THB',
            stock: 15,
          },
          {
            id: 5,
            title: 'Bluetooth Headset',
            link: '#product-card-1',
            image: 'https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286',
            price: 2900,
            currency: 'THB',
            stock: 7,
          },
          {
            id: 6,
            title: 'Wireless Earbuds',
            link: '#product-card-2',
            image: 'https://placeimg.com/640/480/tech/grayscale',
            price: 1800,
            currency: 'THB',
            stock: 15,
          },
      ]);
    // const [images, setImages] = useState([
    //     "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    //     "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    //     "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    //     "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    //     "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    //     "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",

    // ]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const showNextImage = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex < images.length ? nextIndex : 0;
        });
    };

    const showPreviousImage = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex - 1;
            return nextIndex >= 0 ? nextIndex : images.length - 1;
        });
    };

    return (
        <div>
            {currentIndex}
            {/* <img src={images[currentIndex]} alt="Image" style={{ maxWidth: "100%", position: "relative" }} /> */}
            <div style={{ display: "flex", justifyContent: "center", position: "absolute", bottom: 0, left: 0 }}>
                <Button sx={{color:"black"}} onClick={showPreviousImage} disabled={currentIndex === 0}>
                    <ArrowBackIosIcon />
                </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", position: "absolute", bottom: 0, right: 0 }}>
                <Button sx={{color:"black"}} onClick={showNextImage} disabled={currentIndex === images.length - 1}>
                    <ArrowForwardIosIcon />
                </Button>
            </div>
        </div>
    );
};

export default ImageViewer;

