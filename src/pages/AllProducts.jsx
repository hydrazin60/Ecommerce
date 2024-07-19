import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import { SummaryAPI } from "../utils/SummaryAPI";
import { CiEdit } from "react-icons/ci";
import AdminEditProductcomponent from "../components/AdminEditProductcomponent";

export default function AllProducts() {
  const [uploadProductComponent, setUploadProductComponent] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const handleClose = () => {
    setUploadProductComponent(false);
  };

  const fetchAllProducts = async () => {
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
      setAllProducts(dataResponse.data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          onClick={() => setUploadProductComponent(!uploadProductComponent)}
          className="border-2 py-1 border-red-600 text-red-600 hover:bg-red-600 font-semibold hover:text-white transition-all px-4 rounded-full"
        >
          Upload Product
        </button>
      </div>
      <div className=" w-full max-h-48 ">
        <img src="topphoto.jpg" alt="topphoto" />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 bg-pink-300 pt-3">
          {allProducts.length > 0 ? (
            allProducts.map((product, index) => (
              <div key={index} className="p-2 bg-white rounded-lg shadow-md   ">
                <div className="  ">
                  <div
                    className="w-9 h-9 p-2 bg-green-200 text-black text-xl hover:bg-green-700 rounded-full hover:text-white flex justify-center items-center cursor-pointer h-42"
                    onClick={() => handleEditProduct(product)}
                  >
                    <CiEdit />
                  </div>
                </div>

                <img
                  src={product?.productImage[0]}
                  alt="Product"
                  className="object-cover"
                />

                <div className="mt-2">
                  <h3 className="font-bold text-base truncate">
                    {product.productName}
                  </h3>
                  <p className="text-sm font-bold">Price: रु{product.price}</p>

                  <p className="text-ellipsis line-clamp-2">
                    {product.description}{" "}
                  </p>
                  <p className="text-sm font-bold">
                    Selling Price: रु{product.selling}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}

      {uploadProductComponent && <UploadProduct onClose={handleClose} />}
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
// import AdminEditProductcomponent from "../components/AdminEditProductcomponent";

// export default function AllProducts() {
//   const [uploadProductComponent, setUploadProductComponent] = useState(false);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editProduct, setEditProduct] = useState(null);

//   const handleClose = () => {
//     setUploadProductComponent(false);
//   };

//   const fetchAllProducts = async () => {
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
//       setAllProducts(dataResponse.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error.message);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   return (
//     <div>
//       <div className="bg-white py-2 px-4 flex justify-between items-center">
//         <h2 className="font-bold text-lg">All Products</h2>
//         <button
//           onClick={() => setUploadProductComponent(!uploadProductComponent)}
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
//         <div className="flex flex-wrap gap-4 mt-4">
//           {allProducts.length > 0 ? (
//             allProducts.map((product, index) => (
//               <div
//                 key={index}
//                 className="  p-4 bg-white rounded hover:shadow-lg transition-shadow cursor-pointer w-64"
//                 onClick={() => setEditProduct(product)}
//               >
//                 <div className="  w-9 p-2 bg-green-200 text-black text-xl hover:bg-green-700 rounded-full hover:text-white">
//                   <CiEdit />
//                 </div>
//                 <img
//                   src={product?.productImage[0]}
//                   width={120}
//                   height={120}
//                   alt="Product"
//                   className="object-cover"
//                 />
//                 <div className="mt-2">
//                   <h3 className="font-bold text-sm truncate">
//                     {product.productName}
//                   </h3>
//                   <p className="text-sm">Price: ${product.price}</p>
//                   <p className="text-sm">Selling Price: ${product.selling}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No products available</p>
//           )}
//         </div>
//       )}

//       {uploadProductComponent && <UploadProduct onClose={handleClose} />}
//       {editProduct && (
//         <AdminEditProductcomponent
//           product={editProduct}
//           onClose={() => setEditProduct(null)}
//         />
//       )}
//     </div>
//   );
// }
