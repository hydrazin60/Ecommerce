import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("Database is connecten");
  })
  .catch((err) => {
    console.log("database error", err);
  });
