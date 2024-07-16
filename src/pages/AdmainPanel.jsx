import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import "../index.css";
import AllUser from "./AllUser";
import AllProducts from "./AllProducts";
import { useNavigate } from "react-router-dom";
import ROLE from "../helper/ROLE";

export default function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const [activeComponent, setActiveComponent] = useState("allProducts");
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== ROLE.ADMAIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex  ">
      <aside className="bg-white h-full w-60 customShadow fixed top-16 left-0">
        <div className="h-40 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profile ? (
              <img
                src={user?.profile}
                className="w-20 h-20 rounded-full border-2 border-green-400"
                alt="user PP"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-sm font-semibold">{user?.email}</p>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <button
              onClick={() => setActiveComponent("allProducts")}
              className="px-2 py-1 hover:bg-slate-100 text-left"
            >
              All Products
            </button>
            <button
              onClick={() => setActiveComponent("allUsers")}
              className="px-2 py-1 hover:bg-slate-100 text-left"
            >
              All Users
            </button>
          </nav>
        </div>
      </aside>

      <main className="ml-60 w-full h-full p-2 overflow-y-auto">
        {activeComponent === "allUsers" && <AllUser />}
        {activeComponent === "allProducts" && <AllProducts />}
      </main>
    </div>
  );
}

// import React, { useState } from "react";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import "../index.css";
// import AllUser from "./AllUser";
// import AllProducts from "./AllProducts";

// export default function AdminPanel() {
//   const user = useSelector((state) => state?.user?.user);
//   const navigate = useNavigate();
//   const [activeComponent, setActiveComponent] = useState("allUsers");

//   return (
//     <div className="min-h-[calc(100vh-10px)] md:flex hidden">
//       <aside className="bg-white min-h-full w-full max-w-60 customShadow fixed top-16 left-0">
//         <div className="h-40 flex justify-center items-center flex-col">
//           <div className="text-5xl cursor-pointer relative flex justify-center">
//             {user?.profile ? (
//               <img
//                 src={user?.profile}
//                 className="w-20 h-20 rounded-full border-2 border-green-400"
//               />
//             ) : (
//               <FaRegCircleUser />
//             )}
//           </div>
//           <p className="capitalize text-sm font-semibold">{user?.email}</p>
//           <p className="capitalize text-lg font-semibold">{user?.name}</p>
//           <p className="text-sm">{user?.role}</p>
//         </div>
//         <div>
//           <nav className="grid p-4">
//             <button
//               onClick={() => setActiveComponent("allUsers")}
//               className="px-2 py-1 hover:bg-slate-100 text-left"
//             >
//               All Users
//             </button>
//             <button
//               onClick={() => setActiveComponent("allProducts")}
//               className="px-2 py-1 hover:bg-slate-100 text-left"
//             >
//               All Products
//             </button>
//           </nav>
//         </div>
//       </aside>

//       <main className="w-full h-full p-2">
//         {activeComponent === "allUsers" && <AllUser />}
//         {activeComponent === "allProducts" && <AllProducts />}
//       </main>
//     </div>
//   );
// }
