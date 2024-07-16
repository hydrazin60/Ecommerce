import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { productCategory } from "../helper/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { UploadImage } from "../helper/UploadImage";
import DisplayImage from "./DisplayImage";

export default function UploadProduct({ onClose }) {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  const [imagePreview, setImagePreview] = useState([]);
  const [fullImage, setFullImage] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleUploadProduct = async (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreview([...imagePreview, ...previews]);

    const uploadPromises = files.map((file) => UploadImage(file));
    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map((result) => result.secure_url);

    setData((prevState) => ({
      ...prevState,
      productImage: [...prevState.productImage, ...imageUrls],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", data);
  };

  return (
    <div className="fixed h-full w-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-5">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            value={data.productName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded placeholder-gray-500"
          />

          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter brand name"
            value={data.brandName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded placeholder-gray-500"
          />

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={data.category}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="" disabled>
              Select category
            </option>
            {productCategory.map((category) => (
              <option key={category.id} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage">Product Images:</label>
          <label htmlFor="uploadImageInput" className="">
            <div className="p-2 bg-slate-200 border rounded h-32 flex w-full justify-center items-center cursor-pointer">
              <div className="flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Images</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  multiple
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div className="flex flex-wrap gap-3">
            {imagePreview.length > 0 ? (
              imagePreview.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt="Product Preview"
                  width={80}
                  height={80}
                  className="bg-slate-100 border cursor-pointer"
                  onClick={() => setFullImage(preview)}
                />
              ))
            ) : (
              <p className="text-red-500 text-xs">Upload Image*</p>
            )}
          </div>

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Enter product description"
            value={data.description}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded placeholder-gray-500 h-20"
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={data.price}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded placeholder-gray-500"
          />

          <label htmlFor="selling">Selling Price:</label>
          <input
            type="number"
            id="selling"
            placeholder="Enter selling price"
            value={data.selling}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded placeholder-gray-500"
          />

          <button
            type="submit"
            className="px-3 py-2 mb-6 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>

      {fullImage && (
        <DisplayImage image={fullImage} onClose={() => setFullImage(null)} />
      )}
    </div>
  );
}

// import React, { useState } from "react";
// import { CgClose } from "react-icons/cg";
// import { productCategory } from "../helper/ProductCategory";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { UploadImage } from "../helper/UploadImage";
// import DisplayImage from "./DisplayImage";

// export default function UploadProduct({ onClose }) {
//   const [data, setData] = useState({
//     productName: "",
//     brandName: "",
//     category: "",
//     productImage: [],
//     description: "",
//     price: "",
//     selling: "",
//   });

//   const [imagePreview, setImagePreview] = useState([]);

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.id]: e.target.value });
//   };

//   const handleUploadProduct = async (e) => {
//     const files = Array.from(e.target.files);
//     const previews = files.map((file) => URL.createObjectURL(file));

//     setImagePreview([...imagePreview, ...previews]);

//     const uploadPromises = files.map((file) => UploadImage(file));
//     const uploadResults = await Promise.all(uploadPromises);

//     const imageUrls = uploadResults.map((result) => result.secure_url);

//     setData((prevState) => ({
//       ...prevState,
//       productImage: [...prevState.productImage, ...imageUrls],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted", data);
//   };

//   return (
//     <div className="fixed h-full w-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 flex justify-center items-center">
//       <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
//         <div className="flex justify-between items-center pb-5">
//           <h2 className="font-bold text-lg">Upload Product</h2>
//           <div
//             className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
//             onClick={onClose}
//           >
//             <CgClose />
//           </div>
//         </div>
//         <form
//           className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
//           onSubmit={handleSubmit}
//         >
//           <label htmlFor="productName">Product Name:</label>
//           <input
//             type="text"
//             id="productName"
//             placeholder="Enter product name"
//             value={data.productName}
//             onChange={handleChange}
//             className="p-2 bg-slate-100 border rounded placeholder-gray-500"
//           />

//           <label htmlFor="brandName">Brand Name:</label>
//           <input
//             type="text"
//             id="brandName"
//             placeholder="Enter brand name"
//             value={data.brandName}
//             onChange={handleChange}
//             className="p-2 bg-slate-100 border rounded placeholder-gray-500"
//           />

//           <label htmlFor="category">Category:</label>
//           <select
//             id="category"
//             value={data.category}
//             onChange={handleChange}
//             className="p-2 bg-slate-100 border rounded"
//           >
//             <option value="" disabled>
//               Select category
//             </option>
//             {productCategory.map((category) => (
//               <option key={category.id} value={category.value}>
//                 {category.label}
//               </option>
//             ))}
//           </select>

//           <label htmlFor="productImage">Product Images:</label>
//           <label htmlFor="uploadImageInput" className="">
//             <div className="p-2 bg-slate-200 border rounded h-32 flex w-full justify-center items-center cursor-pointer">
//               <div className="flex justify-center items-center flex-col gap-2">
//                 <span className="text-4xl">
//                   <FaCloudUploadAlt />
//                 </span>
//                 <p className="text-sm">Upload Product Images</p>
//                 <input
//                   type="file"
//                   id="uploadImageInput"
//                   className="hidden"
//                   multiple
//                   onChange={handleUploadProduct}
//                 />
//               </div>
//             </div>
//           </label>
//           <div className="flex flex-wrap gap-3">
//             {imagePreview.length > 0 ? (
//               imagePreview.map((preview, index) => (
//                 <img
//                   key={index}
//                   src={preview}
//                   alt="Product Preview"
//                   width={80}
//                   height={80}
//                   className="bg-slate-100 border"
//                 />
//               ))
//             ) : (
//               <p className="text-red-500 text-xs">Upload Image*</p>
//             )}
//           </div>

//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             placeholder="Enter product description"
//             value={data.description}
//             onChange={handleChange}
//             className="p-2 bg-slate-100 border rounded placeholder-gray-500 h-20"
//           />

//           <label htmlFor="price">Price:</label>
//           <input
//             type="number"
//             id="price"
//             placeholder="Enter price"
//             value={data.price}
//             onChange={handleChange}
//             className="p-2 bg-slate-100 border rounded placeholder-gray-500"
//           />

//           <label htmlFor="selling">Selling Price:</label>
//           <input
//             type="number"
//             id="selling"
//             placeholder="Enter selling price"
//             value={data.selling}
//             onChange={handleChange}
//             className="p-2 bg-slate-100 border rounded placeholder-gray-500"
//           />

//           <button
//             type="submit"
//             className="px-3 py-2 mb-6 bg-blue-500 text-white rounded"
//           >
//             Submit
//           </button>
//         </form>

//       </div>

//     </div>
//   );
// }
