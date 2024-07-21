import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import image1Web from "../assest/banner/img1.webp";
import image2Web from "../assest/banner/img2.webp";
import image3Web from "../assest/banner/img3.jpg";
import image4Web from "../assest/banner/img4.jpg";
import image5Web from "../assest/banner/img5.webp";

import image1Mobil from "../assest/banner/img1_mobile.jpg";
import image2Mobil from "../assest/banner/img2_mobile.webp";
import image3Mobil from "../assest/banner/img3_mobile.jpg";
import image4Mobil from "../assest/banner/img4_mobile.jpg";
import image5Mobil from "../assest/banner/img5_mobile.png";

export default function BannerProduct() {
  const desktopImages = [image1Web, image2Web, image3Web, image4Web, image5Web];
  const mobileImages = [
    image1Mobil,
    image2Mobil,
    image3Mobil,
    image4Mobil,
    image5Mobil,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % desktopImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [desktopImages.length]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? desktopImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % desktopImages.length);
  };

  return (
    <div className="container mx-auto md:px-3 overflow-hidden rounded-lg relative">
      <div className="BannerProductContainer relative md:h-72 h-32 w-full overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {desktopImages.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={image}
                className="w-full h-full object-cover object-center"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrevClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-pink-700 text-white px-2 py-1 h-20 rounded-r hidden md:block"
      >
        <FaAngleDoubleRight />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-800 text-white px-2 py-1 rounded-l h-20 hidden md:block"
      >
        <FaAngleDoubleLeft />
      </button>
    </div>
  );
}



// import { FaAngleDoubleRight } from "react-icons/fa";
// import { FaAngleDoubleLeft } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
// import image1Web from "../assest/banner/img1.webp";
// import image2Web from "../assest/banner/img2.webp";
// import image3Web from "../assest/banner/img3.jpg";
// import image4Web from "../assest/banner/img4.jpg";
// import image5Web from "../assest/banner/img5.webp";

// import image1Mobil from "../assest/banner/img1_mobile.jpg";
// import image2Mobil from "../assest/banner/img2_mobile.webp";
// import image3Mobil from "../assest/banner/img3_mobile.jpg";
// import image4Mobil from "../assest/banner/img4_mobile.jpg";
// import image5Mobil from "../assest/banner/img5_mobile.png";

// export default function BannerProduct() {
//   const desktopImages = [image1Web, image2Web, image3Web, image4Web, image5Web];
//   const mobileImages = [
//     image1Mobil,
//     image2Mobil,
//     image3Mobil,
//     image4Mobil,
//     image5Mobil,
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex(
//         (prevIndex) => (prevIndex + 1) % desktopImages.length
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [desktopImages.length]);

//   const handlePrevClick = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? desktopImages.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNextClick = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % desktopImages.length);
//   };

//   return (
//     <div className="   container mx-auto  md:px-3 overflow-hidden rounded-lg  relative   ">
//       <div className=" BannerProductContainner  relative md:h-72 h-32 w-full overflow-hidden">
//       <div
//           className="flex transition-transform duration-1000 ease-in-out"
//           style={{
//             transform: `translateX(-${currentImageIndex * 100}%)`,
//           }}
//         >
//           {desktopImages.map((image, index) => (
//             <div key={index} className="w-full  flex-shrink-0 ">
//               <img
//                 src={image}
//                 className="w-full h-full object-cover object-center"
//                 alt={`Slide ${index + 1}`}
//               />
//             </div>
//           ))}
//         </div>

//       </div>
//       <button
//         onClick={handlePrevClick}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-pink-700 text-white px-2 py-1 h-20 rounded-r hidden md:block"
//       >
//         <FaAngleDoubleRight />
//       </button>
//       <button
//         onClick={handleNextClick}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2   bg-pink-800 text-white px-2 py-1 rounded-l h-20 hidden md:block"
//       >
//         <FaAngleDoubleLeft />
//       </button>
//     </div>
//   );
// }
