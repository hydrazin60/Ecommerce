import mongoose from "mongoose";
const addToCartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Update this to match the model name in ProductModel
    },
    quantity: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);
const AddToCartModel = mongoose.model("AddToCartModel", addToCartSchema);
export default AddToCartModel;

// import mongoose from "mongoose";

// const addToCartSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: String,
//       ref : "ProductModel",
//     },
//     quantity: { type: Number, required: true },
//     userId: { type: String, required: true },
//   },
//   { timestamps: true }
// );
// const AddToCartModel = mongoose.model("AddToCartModel", addToCartSchema);
// export default AddToCartModel;
