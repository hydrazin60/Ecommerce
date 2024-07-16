import React from "react";
import { CgClose } from "react-icons/cg";

export default function DisplayImage({ image, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="relative p-4">
        <div
          className="absolute top-4 right-4 text-4xl text-white cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </div>
        <img
          src={image}
          alt="Full View"
          className="max-h-[80vh] max-w-[80vw] object-contain"
        />
      </div>
    </div>
  );
}
