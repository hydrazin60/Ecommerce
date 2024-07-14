import React, { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SummaryAPI } from "../utils/SummaryAPI";
import { toast } from "react-toastify";
import { setUserDetails } from "../redux/store/userSlice";

export default function Header() {
  const [menuDisplay, setmenuDisplay] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(SummaryAPI.logout_user.url);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(SummaryAPI.logout_user.url, {
        method: SummaryAPI.logout_user.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <header className="h-16 bg-zinc-800 text-white sticky top-0">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <img
            src="logo.png"
            className="h-[60px] rounded-full cursor-pointer"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-screen-sm border rounded-full focus-within:shadow">
          <input
            type="text"
            placeholder="search.."
            className="w-full outline-yellow-400 h-10 border rounded-l-full pl-4 text-black"
          />
          <div className="text-lg h-10 min-w-[50px] bg-red-800 flex items-center justify-center rounded-r-full text-white">
            <FaSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div
            className="relative group flex justify-center "
            onClick={() => setmenuDisplay(!menuDisplay)}
          >
            <div className="text-4xl cursor-pointer">
              {user?.profile ? (
                <img
                  src={user?.profile}
                  className="w-12 h-12 rounded-full border-2 border-green-400 hover:border-yellow-400"
                />
              ) : (
                <FaUserCircle />
              )}
            </div>

            {menuDisplay && (
              <div className="absolute bg-zinc-300 top-12 h-14 w-32 p-4 text-black shadow-lg rounded     group-hover:block ">
                <nav>
                  <Link
                    to="/admain-panel"
                    className="whitespace-normal hover:bg-zinc-200 hover:underline  hover:pt-2 "
                  >
                    Admin-Panel
                  </Link>
                </nav>
              </div>
            )}
          </div>
          <div className="text-2xl relative cursor-pointer">
            <span>
              <FaCartShopping />
            </span>
            <div className="bg-red-600 text-wrap w-5 h-5 rounded-full p-2 pr-3 flex items-center justify-center absolute -top-3 -right-2">
              <p className="text-base">14</p>
            </div>
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 font-bold rounded-full hover:bg-red-700 bg-red-500"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 font-bold rounded-full hover:bg-red-700 bg-red-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// import React from "react";
// import { FaSearch } from "react-icons/fa";
// import { FaUserCircle } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { toast } from "react-toastify";
// export default function Header() {
//   const user = useSelector((state) => state?.user?.user);
//   //
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     const fetchData = await fetch(SummaryAPI.logout_user.url, {
//       method: SummaryAPI.logout_user.method,
//       credentials: "include",
//     });
//     const data = await fetchData.json();
//     if (data.sucess) {
//       toast.success(data.message);
//     }
//     if (data.error) {
//       toast.error(data.message);
//     }
//   };

//   return (
//     <header className="h-16 bg-zinc-800 text-white  sticky top-0">
//       <div className=" h-full container mx-auto flex items-center px-4 justify-between  ">
//         <div>
//           <img
//             src="logo.png"
//             className="h-[60px] rounded-full  cursor-pointer "
//             alt="logo"
//             onClick={() => navigate("/")}
//           />
//         </div>
//         <div className=" hidden lg:flex items-center w-full  justify-between max-w-screen-sm border rounded-full focus-within:shadow ">
//           <input
//             type="text"
//             placeholder="search.."
//             className="w-full outline-yellow-400  h-10 border rounded-l-full pl-4 text-black "
//           />
//           <div className="text-lg h-10  min-w-[50px] bg-red-800 flex items-center justify-center rounded-r-full text-white ">
//             <FaSearch />
//           </div>
//         </div>

//         <div className="flex items-center gap-7">
//           <div className="text-4xl cursor-pointer ">
//             {user?.profile ? (
//               <img
//                 src={user?.profile}
//                 className="w-12 h-12 rounded-full border-2 border-green-400 hover:border-yellow-400"
//               />
//             ) : (
//               <FaUserCircle />
//             )}
//           </div>
//           <div className="text-2xl relative cursor-pointer ">
//             <span>
//               <FaCartShopping />
//             </span>
//             <div className="bg-red-600  text-wrap w-5 h-5 rounded-full p-2 pr-3 flex items-center justify-center absolute -top-3  -right-2">
//               <p className="text-base">14</p>
//             </div>
//           </div>

//           <div>
//             {
//               user?._id(
//                 <button>Logout</button>
//               ) :   <Link
//               to={"/login"}
//               className="px-3 py-1 font-bold rounded-full hover:bg-red-700 bg-red-500"
//             >
//               Login
//             </Link>
//             }

//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
