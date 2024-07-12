import React, { useContext, useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SummaryAPI } from "../utils/SummaryAPI";
import { toast } from "react-toastify";
import Context from "../context";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const { fetchUserDetail } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(SummaryAPI.signIn.url, {
        method: SummaryAPI.signIn.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message);
        await fetchUserDetail(); // Fetch user details after login
        navigate("/");
      } else {
        toast.error(responseData.message || "Login failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container px-4 h-[90vh]">
        <div className="p-5 w-full bg-white max-w-md mx-auto rounded-[10px]">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icon" className="rounded-full" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid">
              <label className="font-medium">Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full h-full bg-transparent outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label className="font-medium">Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full h-full bg-transparent outline-none"
                  onChange={handleChange}
                  required
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-700 font-semibold"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="font-semibold bg-blue-800 hover:scale-110 transition-all hover:bg-blue-600 mt-4 text-white px-6 py-2 w-full max-w-[130px] rounded-full mx-auto block">
              Log in
            </button>
          </form>
          <p className="my-3">
            Don't have an account?{" "}
            <Link
              to={"/sign-up"}
              className="text-green-700 font-semibold hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}



// import React, { useContext, useState } from "react";
// import loginIcon from "../assest/signin.gif";
// import { FaEyeSlash, FaEye } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { toast } from "react-toastify";
// import Context from "../context";

// export default function Login() {
//   const navigate = useNavigate();
//   const { fetchUserDetail } = useContext(Context);

//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((previous) => {
//       return {
//         ...previous,
//         [name]: value,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(SummaryAPI.signIn.url, {
//         method: SummaryAPI.signIn.method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: "include", // Include credentials (cookies)
//       });

//       const responseData = await response.json();

//       if (response.ok) {
//         toast.success(responseData.message);
//         navigate("/");
//         fetchUserDetail();
//       } else {
//         toast.error(responseData.message || "Login failed");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred. Please try again.");
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <section id="login">
//       <div className="mx-auto container px-4 h-[90vh]">
//         <div className="p-5 w-full bg-white max-w-md mx-auto rounded-[10px]">
//           <div className="w-20 h-20 mx-auto">
//             <img src={loginIcon} alt="login icon" className="rounded-full" />
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="grid">
//               <label className="font-medium">Email:</label>
//               <div className="bg-slate-100 p-2">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   className="w-full h-full bg-transparent outline-none"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="font-medium">Password:</label>
//               <div className="bg-slate-100 p-2 flex">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Enter your password"
//                   className="w-full h-full bg-transparent outline-none"
//                   onChange={handleChange}
//                   required
//                 />
//                 <div
//                   className="cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>
//               <Link
//                 to={"/forgot-password"}
//                 className="block w-fit ml-auto hover:underline hover:text-red-700 font-semibold"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//             <button className="font-semibold bg-blue-800 hover:scale-110 transition-all hover:bg-blue-600 mt-4 text-white px-6 py-2 w-full max-w-[130px] rounded-full mx-auto block">
//               Log in
//             </button>
//           </form>
//           <p className="my-3">
//             Don't have an account?{" "}
//             <Link
//               to={"/sign-up"}
//               className="text-green-700 font-semibold hover:text-red-700 hover:underline"
//             >
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

 