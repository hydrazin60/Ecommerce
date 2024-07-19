import React from "react";
import ProductList from "../components/ProductList";
import BannerProduct from "../components/BannerProduct";

export default function Home() {
  return (
    <div>
      <>
        {/* <div className=" h-28 w-full md:h-40 overflow-hidden">
        <img
          src="topphoto.jpg"
          className="w-full h-full object-cover object-top"
        />
      </div> */}
      </>
      <BannerProduct />
      <div className="mt-3">
        <ProductList />
      </div>
    </div>
  );
}
