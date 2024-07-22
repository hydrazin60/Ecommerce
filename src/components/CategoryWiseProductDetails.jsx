import React, { useEffect, useState } from "react";
import { fetchCategoryWiseProduct } from "../helper/fetchCategoryWiseProduct";
import { Link } from "react-router-dom";
import { addToCart } from "../helper/addToCart";

export default function CategoryWiseProductDetails({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-2xl font-bold py-2">{heading}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-x-auto">
        {loading
          ? loadingList.map((_, index) => (
              <div key={index} className="w-full min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow">
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  </div>
                  <button className="text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                to={
                  product?.category + "/single_product_details/" + product?._id
                }
                key={product.id || index}
                className="w-full min-w-[280px] md:min-w-[300px] bg-white rounded-md shadow-md"
              >
                <div className="bg-gray-400 h-44 p-2 flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    alt={product.name}
                    className="object-scale-down hover:scale-110 transition-all h-40"
                  />
                </div>
                <div className="flex flex-col justify-between pl-2">
                  <h2 className="font-medium md:text-lg text-base line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-700">
                    {product?.category}
                  </p>
                  <div className="flex justify-between gap-3">
                    <p className="text-red-600 font-medium">
                      रु {product?.price}
                    </p>
                    <p className="text-zinc-800 line-through">
                      रु {product?.selling}
                    </p>
                  </div>
                  <button
                    className="bg-red-800 hover:bg-red-600 font-medium px-3 py-1 rounded-full text-white"
                    onClick={(e) => addToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
