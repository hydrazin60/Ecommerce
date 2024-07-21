import React from "react";
import ProductList from "../components/ProductList";
import BannerProduct from "../components/BannerProduct";
import HorizentalCardProduct from "../components/HorizentalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
export default function Home() {
  return (
    <div>
      <BannerProduct />
      <ProductList />
      <HorizentalCardProduct category={"airpods"} heading={"Top's Airpodes"} />
      <HorizentalCardProduct
        category={"earphones"}
        heading={"Popular's Earphones"}
      />
      <VerticalCardProduct category={"mobile"} heading={"Top's mobile"} />
      <VerticalCardProduct category={"camera"} heading={"Popular's camera"} />
      <HorizentalCardProduct category={"speaker"} heading={"Top's Airpodes"} />
      <VerticalCardProduct category={"laptop"} heading={"Popular's  Laptop"} />
      <VerticalCardProduct category={"camera"} heading={"Popular's   Camera"} />
      <VerticalCardProduct
        category={"headphones"}
        heading={"Popular's headphones"}
      />
      <VerticalCardProduct category={"router"} heading={"Popular's  router"} />
      <HorizentalCardProduct
        category={"Computer"}
        heading={"Top's  Computer"}
      />
      <HorizentalCardProduct
        category={"monitor"}
        heading={"Popular's monitor"}
      />
      <HorizentalCardProduct category={"airpods"} heading={"Top's Airpodes"} />
      <VerticalCardProduct
        category={"headphones"}
        heading={"Popular's headphones"}
      />
      <VerticalCardProduct category={"router"} heading={"Popular's  router"} />
      <HorizentalCardProduct category={"Computer"} heading={"Top's Computer"} />
      <HorizentalCardProduct
        category={"monitor"}
        heading={"Popular's monitor"}
      />
    </div>
  );
}
