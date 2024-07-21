// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Header from "./components/Header";
// //import Footer from "./components/Footer";
// import Login from "./pages/Login";
// import ForgotPassword from "./components/ForgotPassword";
// import SignUp from "./pages/SignUp";
// import UserDetailsPages from "./pages/UserDetailsPages";
// import Context from "./context";
// import React, { useState, useEffect, useCallback } from "react";
// import { SummaryAPI } from "./utils/SummaryAPI";
// import { useDispatch } from "react-redux";
// import { setUserDetails } from "./redux/store/userSlice";
// import AdmainPanel from "./pages/AdmainPanel";
// import AllUser from "./pages/AllUser";
// import AllProducts from "./pages/AllProducts";
// import ProductCategory from "./pages/ProductCategory";
// import ProductDetails from "./pages/ProductDetails";

// export default function App() {
//   const [user, setUser] = useState(null);
//   const dispatch = useDispatch();

//   const fetchUserDetail = useCallback(async () => {
//     try {
//       const response = await fetch(SummaryAPI.getCurrentUserdetails.url, {
//         method: SummaryAPI.getCurrentUserdetails.method,
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const responseUserData = await response.json();
//       if (responseUserData.success) {
//         dispatch(setUserDetails(responseUserData.data));
//       }
//       setUser(responseUserData.data); // Set the user data
//     } catch (error) {
//       console.error("Failed to fetch user details:", error);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     fetchUserDetail();
//   }, [fetchUserDetail]);

//   return (
//     <Context.Provider value={{ user, fetchUserDetail }}>
//       <BrowserRouter>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/sign-up" element={<SignUp />} />
//           <Route path="/profile" element={<UserDetailsPages />} />
//           <Route path="/admain-panel" element={<AdmainPanel />} />
//           <Route path="/all-users" element={<AllUser />} />
//           <Route path="/all-products" element={<AllProducts />} />
//           {/* <Route
//             path="/product_category_page/:categoryName"
//             element={<ProductCategory />}
//           /> */}
//           <Route
//             path="/product_category_page/:categoryName"
//             element={<ProductCategory />}
//           />
//           <Route
//             path="/single_product_details/:id"
//             element={<ProductDetails />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </Context.Provider>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
//import Footer from "./components/Footer";
import Login from "./pages/Login";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "./pages/SignUp";
import UserDetailsPages from "./pages/UserDetailsPages";
import Context from "./context";
import React, { useState, useEffect, useCallback } from "react";
import { SummaryAPI } from "./utils/SummaryAPI";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/store/userSlice";
import AdmainPanel from "./pages/AdmainPanel";
import AllUser from "./pages/AllUser";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const fetchUserDetail = useCallback(async () => {
    try {
      const response = await fetch(SummaryAPI.getCurrentUserdetails.url, {
        method: SummaryAPI.getCurrentUserdetails.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseUserData = await response.json();
      if (responseUserData.success) {
        dispatch(setUserDetails(responseUserData.data));
      }
      setUser(responseUserData.data); // Set the user data
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  return (
    <Context.Provider value={{ user, fetchUserDetail }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<UserDetailsPages />} />
          <Route path="/admain-panel" element={<AdmainPanel />} />
          <Route path="/all-users" element={<AllUser />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route
            path="/product_category_page/:categoryName"
            element={<ProductCategory />}
          />
          <Route
            path="/:category/single_product_details/:id"
            element={<ProductDetails />}
          />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}
