import ProductModel from "../../models/Product.model.js";

export const getCategoryProduct = async (req, res) => {
  try {
    const productCategories = await ProductModel.distinct("category");
    console.log("Categories:", productCategories);

    const productsByCategory = [];
    for (const category of productCategories) {
      const product = await ProductModel.findOne({ category });
      if (product) {
        productsByCategory.push(product);
      }
    }

    res.status(200).json({
      categories: productCategories,
      products: productsByCategory,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
    });
  }
};

// import ProductModel from "../../models/Product.model.js";

// export const getCategoryProduct = async (req, res) => {
//   try {
//     const productCategories = await ProductModel.distinct("category");
//     console.log("Categories:", productCategories);

//     const productByCategory = [];
//     for (const category of productByCategory) {
//       const product = await ProductModel.findOne(category);
//       if (product) {
//         productByCategory.push(product);
//       }
//     }

//     res.status(200).json({
//       categories: productCategories,
//       error: false,
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: err.message || err,
//       error: true,
//     });
//   }
// };
