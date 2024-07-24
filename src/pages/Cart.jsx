 
// import React, { useEffect, useState } from "react";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { MdDelete } from "react-icons/md";

// export default function Cart() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Function to fetch data
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(SummaryAPI.addtocartProductview.url, {
//         method: SummaryAPI.addtocartProductview.method,
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const responseData = await response.json();
//       if (responseData.success) {
//         setData(responseData.data);
//       } else {
//         console.error("Error fetching data:", responseData.message);
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to update quantity
//   const updateQuantity = async (id, quantity, operation) => {
//     const newQuantity = operation === "increase" ? quantity + 1 : quantity - 1;
//     if (newQuantity < 1) return; // Prevent quantity from going below 1

//     try {
//       const response = await fetch(SummaryAPI.updateCartProduct.url, {
//         method: SummaryAPI.updateCartProduct.method,
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           _id: id,
//           quantity: newQuantity,
//         }),
//       });
//       const responseData = await response.json();
//       if (responseData.success) {
//         setData(
//           data.map((product) =>
//             product._id === id ? { ...product, quantity: newQuantity } : product
//           )
//         );
//       } else {
//         console.error("Error updating product:", responseData.message);
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   // Function to delete product
//   const deleteProduct = async (id) => {
//     try {
//       const response = await fetch(SummaryAPI.deletecartProduct.url, {
//         method: SummaryAPI.deletecartProduct.method,
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ _id: id }), // Send the product ID in the request body
//       });
//       const responseData = await response.json();
//       if (responseData.success) {
//         setData(data.filter((product) => product._id !== id));
//       } else {
//         console.error("Error deleting product:", responseData.message);
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   const TotalQuentaty = data.reduce(
//     (previousValue, CurrentValue) => previousValue + CurrentValue.quantity,
//     0
//   );
//   const totalPrice = data.reduce(
//     (preve, curr) => preve + curr.quantity * curr.productId?.selling
//   );
//   return (
//     <div className="container mx-auto">
//       <div className="text-center text-lg">
//         {data.length === 0 && !loading && (
//           <p className="bg-white py-5">No Data</p>
//         )}
//       </div>
//       <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
//         <div className="w-full max-w-3xl">
//           {loading ? (
//             Array.from({ length: 3 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="w-full bg-slate-400 h-32 my-1 border-slate-200 border animate-pulse rounded"
//               />
//             ))
//           ) : data.length > 0 ? (
//             data.map((product) => (
//               <div
//                 key={product._id}
//                 className="w-full bg-white h-36 p-2 my-1 border-slate-200 border rounded-md overflow-hidden grid grid-cols-[128px,1fr]"
//               >
//                 <div className="w-32 h-32 bg-slate-200">
//                   <img
//                     src={product.productId?.productImage[0] || ""}
//                     alt={`Product ${product._id}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-4 lg:text-xl text-ellipsis line-clamp-1 relative">
//                   <div
//                     onClick={() => deleteProduct(product._id)}
//                     className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-gray-300 cursor-pointer"
//                   >
//                     <MdDelete />
//                   </div>
//                   <h2>{product.productId?.productName || "Unknown"}</h2>
//                   <p className="text-sm text-gray-500 capitalize">
//                     Category: {product.productId?.category || "Unknown"}
//                   </p>
//                   <p className="font-medium text-lg text-red-600">
//                     रु {product.productId?.selling || "0"}
//                   </p>

//                   <div className="flex items-center justify-between  ">
//                     <div className="flex gap-4">
//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             product._id,
//                             product.quantity,
//                             "decrease"
//                           )
//                         }
//                         className="border border-rose-600 hover:bg-red-700 hover:text-white text-red-500 w-6 h-6 flex justify-center items-center rounded"
//                       >
//                         -
//                       </button>
//                       <span>{product.quantity}</span>
//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             product._id,
//                             product.quantity,
//                             "increase"
//                           )
//                         }
//                         className="border border-rose-600 hover:bg-red-700 hover:text-white text-red-500 w-6 h-6 flex justify-center rounded items-center"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <div className=" ">
//                       <h2 className="text-sm text-gray-500 capitalize">
//                         Total Price of {product?.quantity} <br />
//                         {product.productId?.productName} :- रु{" "}
//                         {product.productId?.selling * product?.quantity}
//                       </h2>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No products available</p>
//           )}
//         </div>
//         <div className="mt-5 lg:mt-0 w-full max-w-sm">
//           {loading ? (
//             <div className="h-36 bg-slate-400 animate-pulse border border-slate-200" />
//           ) : (
//             <div className="h-36 bg-white mt-1">
//               <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
//               <div>
//                 <h2></h2>
//               </div>
//               <div>
//                 <p> {TotalQuentaty} </p>
//               </div>
//               <div>
//                 <p>Total Price</p>
//                 <p>{totalPrice}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { SummaryAPI } from "../utils/SummaryAPI";
import { MdDelete } from "react-icons/md";

export default function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryAPI.addtocartProductview.url, {
        method: SummaryAPI.addtocartProductview.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      } else {
        console.error("Error fetching data:", responseData.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update quantity
  const updateQuantity = async (id, quantity, operation) => {
    const newQuantity = operation === "increase" ? quantity + 1 : quantity - 1;
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    try {
      const response = await fetch(SummaryAPI.updateCartProduct.url, {
        method: SummaryAPI.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: newQuantity,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(
          data.map((product) =>
            product._id === id ? { ...product, quantity: newQuantity } : product
          )
        );
      } else {
        console.error("Error updating product:", responseData.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Function to delete product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(SummaryAPI.deletecartProduct.url, {
        method: SummaryAPI.deletecartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }), // Send the product ID in the request body
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(data.filter((product) => product._id !== id));
      } else {
        console.error("Error deleting product:", responseData.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate total quantity and price with initial value for reduce
  const TotalQuantity = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.quantity * currentValue.productId?.selling,
    0
  );

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        <div className="w-full max-w-3xl">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-full bg-slate-400 h-32 my-1 border-slate-200 border animate-pulse rounded"
              />
            ))
          ) : data.length > 0 ? (
            data.map((product) => (
              <div
                key={product._id}
                className="w-full bg-white h-36 p-2 my-1 border-slate-200 border rounded-md overflow-hidden grid grid-cols-[128px,1fr]"
              >
                <div className="w-32 h-32 bg-slate-200">
                  <img
                    src={product.productId?.productImage[0] || ""}
                    alt={`Product ${product._id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 lg:text-xl text-ellipsis line-clamp-1 relative">
                  <div
                    onClick={() => deleteProduct(product._id)}
                    className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-gray-300 cursor-pointer"
                  >
                    <MdDelete />
                  </div>
                  <h2>{product.productId?.productName || "Unknown"}</h2>
                  <p className="text-sm text-gray-500 capitalize">
                    Category: {product.productId?.category || "Unknown"}
                  </p>
                  <p className="font-medium text-lg text-red-600">
                    रु {product.productId?.selling || "0"}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          updateQuantity(
                            product._id,
                            product.quantity,
                            "decrease"
                          )
                        }
                        className="border border-rose-600 hover:bg-red-700 hover:text-white text-red-500 w-6 h-6 flex justify-center items-center rounded"
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            product._id,
                            product.quantity,
                            "increase"
                          )
                        }
                        className="border border-rose-600 hover:bg-red-700 hover:text-white text-red-500 w-6 h-6 flex justify-center rounded items-center"
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <h2 className="text-sm text-gray-500 capitalize">
                        Total Price of {product?.quantity} <br />
                        {product.productId?.productName} :- रु{" "}
                        {product.productId?.selling * product?.quantity}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-400 animate-pulse border border-slate-200" />
          ) : (
            <div className="h-36 bg-white mt-1">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div>
                <p>Total Quantity : {TotalQuantity}</p>
              </div>
              <div>
                <p>Total Price : रु {totalPrice}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
