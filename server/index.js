import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import routeProduct from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", router);
app.use("/api/v1/product", routeProduct);  

mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database error:", err);
  });

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import router from "./routes/user.route.js";
// import cookieParser from "cookie-parser";
// import routeProduct from "./routes/product.route.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4000;

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/v1/users", router);
// app.use("/api/v1/product", routeProduct);
// mongoose
//   .connect(process.env.MONGODBURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Database is connected");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("Database error:", err);
//   });
