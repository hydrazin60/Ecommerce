import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { productCategory } from "../helper/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { UploadImage } from "../helper/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { SummaryAPI } from "../utils/SummaryAPI";

export default function AdminEditProductcomponent({ product, onClose }) {
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setData({
        productName: product.productName || "",
        brandName: product.brandName || "",
        category: product.category || "",
        productImage: product.productImage || [],
        description: product.description || "",
        price: product.price || "",
        selling: product.selling || "",
      });
      setImagePreview(product.productImage || []);
    }
  }, [product]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleUploadProduct = async (e) => {
    setLoading(true);
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreview([...imagePreview, ...previews]);

    try {
      const uploadPromises = files.map((file) => UploadImage(file));
      const uploadResults = await Promise.all(uploadPromises);

      const imageUrls = uploadResults.map((result) => result.secure_url);

      setData((prevState) => ({
        ...prevState,
        productImage: [...prevState.productImage, ...imageUrls],
      }));

      previews.forEach((preview) => URL.revokeObjectURL(preview));
    } catch (error) {
      toast.error("Failed to upload images. Please try again.");
    }
    setLoading(false);
  };

  const handleDeleteImage = (index) => {
    setImagePreview(imagePreview.filter((_, i) => i !== index));
    setData({
      ...data,
      productImage: data.productImage.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(SummaryAPI.updateProduct.url, {
        method: SummaryAPI.updateProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
      } else if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed h-full w-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-5">
          <h2 className="font-bold text-lg">Edit Product</h2>
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
            required
          />

          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter brand name"
            value={data.brandName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded placeholder-gray-500"
            required
          />

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={data.category}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded"
            required
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
                  required
                />
              </div>
            </div>
          </label>
          <div className="flex flex-wrap gap-3">
            {imagePreview.length > 0 ? (
              imagePreview.map((preview, index) => (
                <div key={index} className="relative cursor-pointer">
                  <img
                    src={preview}
                    alt="Product Preview"
                    width={80}
                    height={80}
                    className="bg-slate-100 border cursor-pointer"
                    onClick={() => setFullImage(preview)}
                  />
                  <div
                    className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <MdDelete />
                  </div>
                </div>
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
            required
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={data.price}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded placeholder-gray-500"
            required
          />
          <label htmlFor="selling">Selling Price:</label>
          <input
            type="number"
            id="selling"
            placeholder="Enter selling price"
            value={data.selling}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded placeholder-gray-500"
            required
          />
          <button
            type="submit"
            className="px-3 py-2 mb-6 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {fullImage && (
        <DisplayImage image={fullImage} onClose={() => setFullImage(null)} />
      )}
    </div>
  );
}
