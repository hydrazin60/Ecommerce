import React, { useState } from "react";
import UploadProduct from "../components/UploadProduct";

export default function AllProducts() {
  const [uploadproductcomponent, setuploadproductcomponent] = useState(false);

  const handleClose = () => {
    setuploadproductcomponent(false);
  };

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          onClick={() => setuploadproductcomponent(!uploadproductcomponent)}
          className="border-2 py-1 border-red-600 text-red-600 hover:bg-red-600 font-semibold hover:text-white transition-all px-4 rounded-full"
        >
          Upload Product
        </button>
      </div>

      {uploadproductcomponent && <UploadProduct onClose={handleClose} />}
    </div>
  );
}
