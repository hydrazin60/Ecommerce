import React, { useEffect, useState } from "react";
import { fetchCategoryWiseProduct } from "../helper/fetchCategoryWiseProduct";
import { Link } from "react-router-dom";
import { addToCart } from "../helper/addToCart";
export default function HorizentalCardProduct({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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

      <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none ">
        {loading
          ? loadingList.map((_, index) => (
              <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                  <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                  <div className="flex gap-3 w-full">
                    <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                  </div>
                  <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                to={
                  product?.category + "/single_product_details/" + product?._id
                }
                key={product.id || index}
                className="w-full md:min-w-[300px] min-w-[280px] md:max-w-[300px] max-w-[280px] h-36 bg-white rounded-md shadow-md flex"
              >
                <div className="bg-gray-400 h-full min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product.productImage[0]}
                    alt={product.name}
                    className="object-scale-down h-full hover:scale-110 transition-all overflow-hidden"
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
                    className=" bg-red-800 hover:bg-red-600 font-medium px-3 py-1 rounded-full text-white"
                    onClick={(e) => {
                      const userConfiremed = window.confirm(
                        "Are you sure you want to add this product to the cart?"
                      );
                      if (userConfiremed) {
                        addToCart(e, product?._id);
                      }
                    }}
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