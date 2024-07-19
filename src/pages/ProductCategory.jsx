import React from "react";
import { useParams } from "react-router-dom";

export default function ProductCategory() {
  const params = useParams();
  console.log("category name", params);
  return <div>{params?.categoryName}</div>;
}
