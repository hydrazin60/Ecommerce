import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
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
              <label className="font-medium">Email:</label>{" "}
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full h-full bg-transparent outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="font-medium">Password:</label>{" "}
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full h-full bg-transparent outline-none"
                  onChange={handleChange}
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

// import React, { useState } from "react";
// import loginIcon from "../assest/signin.gif";
// import { FaEyeSlash } from "react-icons/fa";
// import { FaEye } from "react-icons/fa";
// import { Link } from "react-router-dom";
// export default function Login() {
//   const [showpassword, setshowpassword] = useState(false);
//   const [formdata, setformdata] = useState({
//     email: " ",
//     password: " ",
//   });
//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setformdata((preveius) => {
//       return {
//         ...preveius,
//         [name]: value,
//       };
//     });
//   };
//   console.log(formdata);
//   return (
//     <section id="login ">
//       <div className="mx-auto container px-4">
//         <div className="p-5 w-full bg-white max-w-md mx-auto rounded-[10px]">
//           <div className="w-20 h-20  mx-auto">
//             <img src={loginIcon} alt="login icon" className="rounded-full" />
//           </div>
//           <form>
//             <div className="grig">
//               <label className="font-medium">email : </label>
//               <div className=" bg-slate-100 p-2">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="enter your email id"
//                   className="w-full h-full bg-transparent outline-none "
//                   onChange={handlechange}
//                 />
//               </div>
//             </div>
//             <div>
//               <labe className="font-medium"> password : </labe>
//               <div className=" bg-slate-100 p-2 flex ">
//                 <input
//                   type={showpassword ? "text" : "password"}
//                   name="password"
//                   placeholder="enter your  password "
//                   className="w-full h-full bg-transparent outline-none"
//                   onChange={() => handlechange}
//                 />
//                 <div
//                   className="cursor-pointer"
//                   onClick={() => setshowpassword(!showpassword)}
//                 >
//                   {showpassword ? (
//                     <span>
//                       <FaEyeSlash />
//                     </span>
//                   ) : (
//                     <span>
//                       <FaEye />
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <Link
//                 to={"/forgot-password"}
//                 className="block w-fit ml-auto hover:underline hover:text-red-700 font-semibold"
//               >
//                 Forgot Password ?
//               </Link>
//             </div>
//             <button className=" font-semibold bg-blue-800 hover:scale-110 transition-all hover:bg-blue-600 mt-4 text-white px-6 py-2 w-full max-w-[130px] rounded-full mx-auto block  ">
//               Lig in
//             </button>
//           </form>
//           <p className="my-3">
//             Don't have account ?{" "}
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
