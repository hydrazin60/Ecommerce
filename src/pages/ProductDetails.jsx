import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SummaryAPI } from "../utils/SummaryAPI";
import { FaStar, FaStarHalf } from "react-icons/fa";
import VerticalCardProduct from "../components/VerticalCardProduct";
import { productCategory } from "../helper/ProductCategory";
import CategoryWiseProductDetails from "../components/CategoryWiseProductDetails";
import { fetchCategoryWiseProduct } from "../helper/fetchCategoryWiseProduct";

export default function ProductDetails() {
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [DataRecommended, setDataRecommended] = useState([]);
  const [HoverImageCoordinate, setHoverImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [data, setData] = useState({
    productName: " ",
    brandName: " ",
    category: " ",
    productImage: [],
    description: " ",
    price: " ",
    selling: " ",
  });
  const params = useParams();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryAPI.singleProductDetails.url, {
      method: SummaryAPI.singleProductDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    const ResponseData = await response.json();
    if (ResponseData.success) {
      setData(ResponseData.data);
      setActiveImage(ResponseData?.data.productImage[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params.id]);

  const handleMouseEnterProductImage = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setHoverImageCoordinate({
      x,
      y,
    });
  };

  const RecommendedDataFunction = async () => {
    try {
      const RecommendedDataResponse = await fetch(
        SummaryAPI.getallproduct.url,
        {
          method: SummaryAPI.getallproduct.method,
          credentials: "include",
        }
      );
      const RecommendedData = await RecommendedDataResponse.json();
      setDataRecommended(RecommendedData.data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-5">
        {/* image */}
        <div className="relative h-96 flex flex-col lg:flex-row-reverse gap-5 items-center">
          <div className="relative h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-300">
            {loading ? (
              <div className="bg-slate-400 animate-pulse h-full w-full"></div>
            ) : (
              <img
                src={activeImage}
                className="w-full h-full object-cover cursor-pointer"
                onMouseMove={handleZoomImage}
                onMouseLeave={() => setHoverImageCoordinate({ x: 0, y: 0 })}
              />
            )}
            {HoverImageCoordinate.x !== 0 && HoverImageCoordinate.y !== 0 && (
              <div
                className="hidden lg:block absolute top-10 left-[400px] w-full h-full p-2"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundPosition: `${HoverImageCoordinate.x}% ${HoverImageCoordinate.y}%`,
                  backgroundSize: "200%",
                  backgroundRepeat: "no-repeat",
                  pointerEvents: "none",
                }}
              ></div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => (
                  <div
                    className="h-20 w-20 bg-slate-400 rounded animate-pulse"
                    key={"loadingImage" + index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data.productImage.map((imageUrl, index) => (
                  <div className="h-20 w-20 bg-zinc-300 rounded" key={imageUrl}>
                    <img
                      src={imageUrl}
                      className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                      onMouseEnter={() =>
                        handleMouseEnterProductImage(imageUrl)
                      }
                      onClick={() => handleMouseEnterProductImage(imageUrl)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* product details */}
        {loading ? (
          <div className="flex flex-col gap-1 w-full lg:mr-16">
            <h1 className="bg-slate-400 rounded-full w-full animate-pulse h-6 lg:h-8 md:h-8"></h1>
            <p className="rounded-full h-9 w-full bg-slate-400"></p>
            <p className="text-lg capitalize bg-slate-400 animate-pulse h-5 lg:h-8 rounded-full w-24 my-1"></p>
            <div className="bg-slate-400 animate-pulse h-6 lg:h-8 w-24 rounded-full my-1"></div>
            <div className="flex items-center gap-5 bg-slate-400 my-2">
              <p className="text-slate-400 animate-pulse line-through"></p>
              <p className="bg-slate-400 animate-pulse"></p>
            </div>
            <div className="flex items-center gap-3">
              <button className="border-2 bg-slate-400 h-10 rounded-lg px-3 py-1 min-w-[100px] animate-pulse"></button>
              <button className="border-2 bg-slate-400 h-10 rounded-lg px-4 py-1 min-w-[120px] animate-pulse"></button>
            </div>
            <div className="h-32 w-full rounded-sm animate-pulse bg-slate-400 font-medium my-1"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <h1 className="text-black text-lg font-semibold bg-red-200 w-fit px-4 rounded-full">
              {data.brandName}
            </h1>
            <p className="text-4xl text-black font-medium">
              {data.productName}
            </p>
            <p className="text-lg capitalize text-gray-400">{data.category}</p>
            <div className="text-pink-600 flex gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-5 text-2xl font-semibold my-2">
              <p className="text-zinc-400 line-through">रू{data.price}</p>
              <p className="text-red-500">रू{data.selling}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] hover:bg-red-600 hover:text-white font-medium">
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-4 py-1 min-w-[120px] font-semibold hover:bg-red-600 hover:text-white">
                Add To Cart
              </button>
            </div>
            <div className="text-slate-700 font-medium my-1">
              Description:
              <p>{data.description}</p>
            </div>
          </div>
        )}
      </div>
      <VerticalCardProduct
        category={data?.category}
        heading={"Recommended Product"}
      />
      <CategoryWiseProductDetails
        category={data?.category}
        heading={"Recommended Product"}
      />
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { FaStar, FaStarHalf } from "react-icons/fa";

// export default function ProductDetails() {
//   const [loading, setLoading] = useState(true);
//   const productImageListLoading = new Array(4).fill(null);
//   const [activeImage, setActiveImage] = useState("");
//   const [HoverImageCoordinate, setHoverImageCoordinate] = useState({
//     x: 0,
//     y: 0,
//   });
//   const [data, setData] = useState({
//     productName: " ",
//     brandName: " ",
//     category: " ",
//     productImage: [],
//     description: " ",
//     price: " ",
//     selling: " ",
//   });
//   const params = useParams();

//   const fetchProductDetails = async () => {
//     setLoading(true);
//     const response = await fetch(SummaryAPI.singleProductDetails.url, {
//       method: SummaryAPI.singleProductDetails.method,
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         productId: params?.id,
//       }),
//     });
//     const ResponseData = await response.json();
//     if (ResponseData.success) {
//       setData(ResponseData.data);
//       setActiveImage(ResponseData?.data.productImage[0]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [params.id]);

//   const handleMouseEnterProductImage = (imageUrl) => {
//     setActiveImage(imageUrl);
//   };

//   const handleZoomImage = (e) => {
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setHoverImageCoordinate({
//       x,
//       y,
//     });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="min-h-[200px] flex flex-col lg:flex-row gap-5">
//         {/* image */}
//         <div className="relative h-96 flex flex-col lg:flex-row-reverse gap-5 items-center">
//           <div className="relative h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-300">
//             {loading ? (
//               <div className="bg-slate-400 animate-pulse h-full w-full"></div>
//             ) : (
//                 <img
//                 src={activeImage}
//                 className="w-full h-full object-cover cursor-pointer"
//                 onMouseMove={handleZoomImage}
//                 onMouseLeave={() => setHoverImageCoordinate({ x: 0, y: 0 })}
//               />
//             )}
//              <div
//               className="hidden lg:block absolute top-0 left-[400px] w-full h-full"
//               style={{
//                 backgroundImage: `url(${activeImage})`,
//                 backgroundPosition: `${HoverImageCoordinate.x}% ${HoverImageCoordinate.y}%`,
//                 backgroundSize: "200%",
//                 backgroundRepeat: "no-repeat",
//                 pointerEvents: "none",
//               }}
//             ></div>
//           </div>

//           <div className="h-full">
//             {loading ? (
//               <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
//                 {productImageListLoading.map((el, index) => (
//                   <div
//                     className="h-20 w-20 bg-slate-400 rounded animate-pulse"
//                     key={"loadingImage" + index}
//                   ></div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
//                 {data.productImage.map((imageUrl, index) => (
//                   <div className="h-20 w-20 bg-zinc-300 rounded" key={imageUrl}>
//                     <img
//                       src={imageUrl}
//                       className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
//                       onMouseEnter={() =>
//                         handleMouseEnterProductImage(imageUrl)
//                       }
//                       onClick={() => handleMouseEnterProductImage(imageUrl)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* product details */}
//         {loading ? (
//           <div className="flex flex-col gap-1 w-full lg:mr-16">
//             <h1 className="bg-slate-400 rounded-full w-full animate-pulse h-6 lg:h-8 md:h-8"></h1>
//             <p className="rounded-full h-9 w-full bg-slate-400"></p>
//             <p className="text-lg capitalize bg-slate-400 animate-pulse h-5 lg:h-8 rounded-full w-24 my-1"></p>
//             <div className="bg-slate-400 animate-pulse h-6 lg:h-8 w-24 rounded-full my-1"></div>
//             <div className="flex items-center gap-5 bg-slate-400 my-2">
//               <p className="text-slate-400 animate-pulse line-through"></p>
//               <p className="bg-slate-400 animate-pulse"></p>
//             </div>
//             <div className="flex items-center gap-3">
//               <button className="border-2 bg-slate-400 h-10 rounded-lg px-3 py-1 min-w-[100px] animate-pulse"></button>
//               <button className="border-2 bg-slate-400 h-10 rounded-lg px-4 py-1 min-w-[120px] animate-pulse"></button>
//             </div>
//             <div className="h-32 w-full rounded-sm animate-pulse bg-slate-400 font-medium my-1"></div>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-1">
//             <h1 className="text-black text-lg font-semibold bg-red-200 w-fit px-4 rounded-full">
//               {data.brandName}
//             </h1>
//             <p className="text-4xl text-black font-medium">
//               {data.productName}
//             </p>
//             <p className="text-lg capitalize text-gray-400">{data.category}</p>
//             <div className="text-pink-600 flex gap-1">
//               <FaStar />
//               <FaStar />
//               <FaStar />
//               <FaStarHalf />
//             </div>
//             <div className="flex items-center gap-5 text-2xl font-semibold my-2">
//               <p className="text-zinc-400 line-through">रू{data.price}</p>
//               <p className="text-red-500">रू{data.selling}</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[100px] hover:bg-red-600 hover:text-white font-medium">
//                 Buy
//               </button>
//               <button className="border-2 border-red-600 rounded px-4 py-1 min-w-[120px] font-semibold hover:bg-red-600 hover:text-white">
//                 Add To Cart
//               </button>
//             </div>
//             <div className="text-slate-700 font-medium my-1">
//               Description:
//               <p>{data.description}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { FaStar } from "react-icons/fa";
// import { FaStarHalf } from "react-icons/fa";
// export default function ProductDetails() {
//   const [loading, setLoading] = useState(true);
//   const productImageListLoading = new Array(4).fill(null);
//   const [activeImage, setActiveImage] = useState("");
//   const [HoverImageCoordinate, setHoverImageCoordinate] = useState({
//     x: 0,
//     y: 0,
//   });
//   const [data, setData] = useState({
//     productName: " ",
//     brandName: " ",
//     category: " ",
//     productImage: [],
//     description: " ",
//     price: " ",
//     selling: " ",
//   });
//   const params = useParams();
//   console.log("product id", params);
//   const fetchProductDetails = async () => {
//     setLoading(true);
//     const response = await fetch(SummaryAPI.singleProductDetails.url, {
//       method: SummaryAPI.singleProductDetails.method,
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         productId: params?.id,
//       }),
//     });
//     const ResponseData = await response.json();
//     if (ResponseData.success) {
//       setData(ResponseData.data);
//       setActiveImage(ResponseData?.data.productImage[0]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [params.id]);
//   const handleMouseEnterProductImage = (imageUrl) => {
//     setActiveImage(imageUrl);
//   };
//     const handleZoomImage = (e) => {
//       const { left, top, width, height } = e.target.getBoundingClientRect();
//       console.log("cordinate left top all ", left, top, width, height);
//       const x = (e.clientX - left) * width;
//       const y = (e.clientY - top) * height;
//       setHoverImageCoordinate({
//         x,
//         y,
//       });

// }
// return (
//   <div className="container mx-auto p-4">
//     <div className="min-h-[200px] flex flex-col lg:flex-row gap-5 ">
//       {/* image */}
//       <div className="h-96 flex flex-col  lg:flex-row-reverse gap-5  items-center ">
//           <div className=" h-[300px] w-[300px]  lg:h-96 lg:w-96  bg-slate-300">
//             {loading ? (
//               <div className=" bg-slate-400 animate-pulse h-[300px] w-[300px]  lg:h-96 lg:w-96 "></div>
//             ) : (
//               <img
//                 src={activeImage}
//                 className="w-full h-full object-scale-down  mix-blend-multiply"
//                 onMouseEnter={handleZoomImage}
//               />
//             )}
//             <div className=" hidden lg:block absolute left-[540px]   min-w-[400px]  min-h-[384px]  bg-slate-300    top-[108px] ">
//               <div
//                 className="h-full w-full min-w-[400px] min-h-[384px] "
//                 style={{
//                   backgroundImage: `url(${activeImage})`,
//                   backgroundPosition: `${HoverImageCoordinate.x * 100}%``${
//                     HoverImageCoordinate.y * 100
//                   }%`,
//                 }}
//               ></div>
//             </div>
//           </div>

//           <div className="h-full">
//             {loading ? (
//               <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
//                 {productImageListLoading.map((el, index) => (
//                   <div
//                     className="h-20 w-20 bg-slate-400  rounded animate-pulse"
//                     key={"loadingImage" + index}
//                   ></div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
//                 {data.productImage.map((imageUrl, index) => (
//                   <div className="h-20 w-20 bg-zinc-300 rounded" key={imageUrl}>
//                     <img
//                       src={imageUrl}
//                       className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
//                       onMouseEnter={() =>
//                         handleMouseEnterProductImage(imageUrl)
//                       }
//                       onClick={() => handleMouseEnterProductImage(imageUrl)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//       {loading ? (
//         <div className=" flex flex-col gap-1 w-full lg:mr-16">
//           <h1 className="  bg-slate-400   rounded-full w-full   animate-pulse   h-6 lg:h-8 md:h-8   "></h1>
//           <p className="   rounded-full f h-9 w-full bg-slate-400   "></p>
//           <p className="text-lg capitalize bg-slate-400 animate-pulse h-5 lg:h-8 rounded-full w-24 my-1 "></p>
//           <div className=" bg-slate-400 animate-pulse h-6 lg:h-8 w-24 rounded-full my-1"></div>
//           <div className="flex items-center gap-5 bg-slate-400 my-2">
//             <p className=" text-slate-400 animate-pulse line-through"> </p>
//             <p className="bg-slate-400 animate-pulse"> </p>
//           </div>
//           <div className="flex items-center gap-3 ">
//             <button className="border-2  bg-slate-400 h-10 rounded-lg  px-3  py-1 min-w-[100px] animate-pulse   "></button>
//             <button className="border-2     bg-slate-400 h-10 rounded-lg  px-4 py-1 min-w-[120px]  animate-pulse    "></button>
//           </div>
//           <div className=" h-32 w-full rounded-sm animate-pulse   bg-slate-400  font-medium my-1"></div>
//         </div>
//       ) : (
//         <div className=" flex flex-col gap-1">
//           <h1 className=" text-black textlgl font-semibold bg-red-200 w-fit  px-4 rounded-full ">
//             {data.brandName}
//           </h1>
//           <p className="text-4xl  text-black font-medium  ">
//             {data.productName}
//           </p>
//           <p className="text-lg capitalize text-gray-400 ">{data.category}</p>
//           <div className="text-pink-600 flex gap-1 ">
//             <FaStar />
//             <FaStar />
//             <FaStar />
//             <FaStarHalf />
//           </div>
//           <div className="flex items-center gap-5 text-2xl font-semibold my-2">
//             <p className=" text-zinc-400 line-through">रू{data.price}</p>
//             <p className="text-red-500">रू{data.selling}</p>
//           </div>
//           <div className="flex items-center gap-3 ">
//             <button className="border-2 border-red-600 rounded px-3  py-1 min-w-[100px] hover:bg-red-600 hover:text-white  font-medium">
//               Buy
//             </button>
//             <button className="border-2 border-red-600 rounded px-4 py-1 min-w-[120px] font-semibold hover:bg-red-600 hover:text-white">
//               Add To Cart
//             </button>
//           </div>
//           <div className="text-slate-700 font-medium my-1">
//             Description :<p> {data.description} </p>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );
