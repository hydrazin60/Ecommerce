import { toast } from "react-toastify";
import { SummaryAPI } from "../utils/SummaryAPI.js";

export const addToCart = async (e, id) => {
  e.stopPropagation();
  e.preventDefault();

  try {
    const response = await fetch(SummaryAPI.addtoCartProduct.url, {
      method: SummaryAPI.addtoCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const responseData = await response.json();

    if (response.ok) {
      // Check if the response status is OK (status code 200-299)
      toast.success(responseData.message);
    } else {
      toast.error(
        responseData.message || "An error occurred while adding to cart"
      );
    }
  } catch (error) {
    toast.error("An error occurred while adding to cart");
  }
};
