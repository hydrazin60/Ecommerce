import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import { SummaryAPI } from "../utils/SummaryAPI";
import { CiEdit } from "react-icons/ci";
import AdminEditProductcomponent from "../components/AdminEditProductcomponent";

export default function AllProducts() {
  const [uploadproductcomponent, setuploadproductcomponent] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const handleClose = () => {
    setuploadproductcomponent(false);
  };

  const fetchAllProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryAPI.getallproduct.url, {
        method: SummaryAPI.getallproduct.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setAllProduct(dataResponse.data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          onClick={() => setuploadproductcomponent(!uploadproductcomponent)}
          className="border-2 py-1 border-red-600 text-red-600 hover:bg-red-600 font-semibold hover:text-white transition-all px-4 rounded-full"
        >
          Upload Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="  flex items-center gap-4 py-4 flex-wrap ">
          {allProduct.length > 0 ? (
            allProduct.map((product, index) => (
              <div
                key={index}
                className="relative p-4 bg-white rounded hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setEditProduct(product)}
              >
                <div className="absolute top-2 right-2 w-9 p-2 bg-green-200 text-black text-xl hover:bg-green-700 rounded-full hover:text-white">
                  <CiEdit />
                </div>
                <img
                  src={product?.productImage[0]}
                  width={120}
                  height={120}
                  alt="Product"
                  className="object-cover"
                />
                <div>
                  <h3 className="font-bold">{product.productName}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Selling Price: ${product.selling}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}

      {uploadproductcomponent && <UploadProduct onClose={handleClose} />}
      {editProduct && (
        <AdminEditProductcomponent
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import UploadProduct from "../components/UploadProduct";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { CiEdit } from "react-icons/ci";

// export default function AllProducts() {
//   const [uploadproductcomponent, setuploadproductcomponent] = useState(false);
//   const [allProduct, setAllProduct] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleClose = () => {
//     setuploadproductcomponent(false);
//   };

//   const fetchAllProduct = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(SummaryAPI.getallproduct.url, {
//         method: SummaryAPI.getallproduct.method,
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const dataResponse = await response.json();
//       setAllProduct(dataResponse.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error.message);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllProduct();
//   }, []);

//   return (
//     <div>
//       <div className="bg-white py-2 px-4 flex justify-between items-center">
//         <h2 className="font-bold text-lg">All Products</h2>
//         <button
//           onClick={() => setuploadproductcomponent(!uploadproductcomponent)}
//           className="border-2 py-1 border-red-600 text-red-600 hover:bg-red-600 font-semibold hover:text-white transition-all px-4 rounded-full"
//         >
//           Upload Product
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <div className="flex items-center gap-4 py-4 flex-wrap">
//           {allProduct.length > 0 ? (
//             allProduct.map((product, index) => (
//               <div key={index} className="p-4 bg-white rounded ">
//                 <div className="w-9 ml-auto p-2 bg-green-200 text-black text-xl hover:bg-green-700 rounded-full hover:text-white">
//                   <CiEdit />
//                 </div>
//                 <img
//                   src={product?.productImage[0]}
//                   width={120}
//                   height={120}
//                   alt="Product"
//                   className=" object-cover"
//                 />
//                 <div>
//                   <h3 className="font-bold">{product.productName}</h3>
//                   <p>Price: ${product.price}</p>
//                   <p>Selling Price: ${product.selling}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No products available</p>
//           )}
//         </div>
//       )}

//       {uploadproductcomponent && <UploadProduct onClose={handleClose} />}
//     </div>
//   );
// }
