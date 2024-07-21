import React, { useEffect, useState } from "react";
import { SummaryAPI } from "../utils/SummaryAPI";
import { Link } from "react-router-dom";

export default function ProductCategoryPage() {
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const categoryLoading = new Array(13).fill(null);

  const fetchProductCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryAPI.ProductCategory.url, {
        method: SummaryAPI.ProductCategory.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData && responseData.products) {
        setProductCategories(responseData.products);
      } else {
        console.error("Products not found in fetched data:", responseData);
        setError("Products not found in fetched data.");
      }
    } catch (error) {
      console.error("Error fetching product categories:", error);
      setError("Error fetching product categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-between px-3 md:px-6 gap-4 overflow-hidden ">
        {categoryLoading.map((_, index) => (
          <div
            key={index}
            className="flex-none h-16 w-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-slate-500 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto shadow-md md:mt-6  ">
      <div className="flex items-center gap-10 overflow-scroll scrollbar-none  ">
        {productCategories.map((product, index) => (
          <Link
            to={"/product_category_page/" + product?.category}
            key={index}
            className="relative group"
          >
            <div className="cursor-pointer h-16 md:w-24 md:h-24 rounded-xl overflow-hidden p-1 md:p-3 bg-white items-center justify-center shadow-md block relative transition-transform transform group-hover:scale-150">
              <img
                src={
                  product.productImage && product.productImage.length > 0
                    ? product.productImage[0]
                    : ""
                }
                alt={product.category}
                className="object-fill h-full w-full rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "path/to/fallback/image.png";
                }}
              />
            </div>
            <p className="text-center text-sm md:text-balance uppercase">
              {product.category}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { Link } from "react-router-dom";

// export default function ProductCategoryPage() {
//   const [productCategories, setProductCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
// const categoryLoading = new Array(13).fill(null)

//   const fetchProductCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(SummaryAPI.ProductCategory.url, {
//         method: SummaryAPI.ProductCategory.method,
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const responseData = await response.json();

//       if (responseData && responseData.products) {
//         setProductCategories(responseData.products);
//       } else {
//         console.error("Products not found in fetched data:", responseData);
//         setError("Products not found in fetched data.");
//       }
//     } catch (error) {
//       console.error("Error fetching product categories:", error);
//       setError("Error fetching product categories.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProductCategories();
//   }, []);

//   if (loading) {
//     return (
//         {
//             categoryLoading.map((el , index)=>{
//                 <div className="  h-16 md:w-20 md:h-20 rounded-xl overflow-hidden p-1 md:p-3  bg-white"></div>
//             })
//         }

//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4">
//       <div className="flex items-center justify-between  gap-5 overflow-scroll scrollbar-none  ">
//         {productCategories.map((product, index) => (
//           <Link
//             to={"/product_category_page/" + product?.category}
//             className=" relative group  "
//           >
//             <div
//               key={index}
//               className=" cursor-pointer  h-16 md:w-20 md:h-20 rounded-xl overflow-hidden p-1 md:p-3  bg-white   items-center justify-center shadow-md       block relative transition-transform transform group-hover:scale-150"
//             >
//               <img
//                 src={
//                   product.productImage && product.productImage.length > 0
//                     ? product.productImage[0]
//                     : ""
//                 }
//                 alt={product.category}
//                 className=" object-fill h-full w-full  rounded-xl"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "path/to/fallback/image.png";
//                 }}
//               />
//             </div>
//             <p className="text-center text-sm md:text-balance uppercase">
//               {product.category}
//             </p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { Link } from "react-router-dom";

// export default function ProductCategoryPage() {
//   const [productCategories, setProductCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const categoryLoading = new Array(13).fill(null);

//   const fetchProductCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(SummaryAPI.ProductCategory.url, {
//         method: SummaryAPI.ProductCategory.method,
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const responseData = await response.json();

//       if (responseData && responseData.products) {
//         setProductCategories(responseData.products);
//       } else {
//         console.error("Products not found in fetched data:", responseData);
//         setError("Products not found in fetched data.");
//       }
//     } catch (error) {
//       console.error("Error fetching product categories:", error);
//       setError("Error fetching product categories.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProductCategories();
//   }, []);

//   if (!loading) {
//     return (
//       <div className="flex items-center justify-between px-6 gap-4 overflow-hidden">
//         {categoryLoading.map((_, index) => (
//           <div
//             key={index}
//             className="flex-none h-16 w-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-slate-500 animate-pulse"
//           ></div>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4">
//       <div className="flex flex-wrap items-center justify-between gap-5 overflow-hidden">
//         {productCategories.map((product, index) => (
//           <Link
//             to={"/product_category_page/" + product?.category}
//             key={index}
//             className="relative group"
//           >
//             <div className="cursor-pointer h-16 w-16 md:w-20 md:h-20 rounded-xl overflow-hidden p-1 md:p-3 bg-white items-center justify-center shadow-md transition-transform transform group-hover:scale-105">
//               <img
//                 src={
//                   product.productImage && product.productImage.length > 0
//                     ? product.productImage[0]
//                     : "path/to/fallback/image.png"
//                 }
//                 alt={product.category}
//                 className="object-cover h-full w-full rounded-xl"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "path/to/fallback/image.png";
//                 }}
//               />
//             </div>
//             <p className="text-center text-sm md:text-base uppercase">
//               {product.category}
//             </p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
