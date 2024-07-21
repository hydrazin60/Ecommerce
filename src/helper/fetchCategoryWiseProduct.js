import { SummaryAPI } from "../utils/SummaryAPI";

export const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(SummaryAPI.categoryWiseProduct.url, {
    method: SummaryAPI.categoryWiseProduct.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });
  const responseData = await response.json();
  return responseData;
};
