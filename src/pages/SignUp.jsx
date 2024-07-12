import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { imageToBase64 } from "../helper/ImageTobase64";
import { SummaryAPI } from "../utils/SummaryAPI";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUploadPicture = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setFormData((previous) => ({
      ...previous,
      profile: imagePic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      toast.error("Please check password and confirm password");
      return;
    }
    console.log();
    try {
      const response = await fetch(SummaryAPI.signUP.url, {
        method: SummaryAPI.signUP.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <section id="sign-up">
      <div className="mx-auto container px-4 h-[90vh]">
        <div className="p-5 w-full bg-white max-w-md mx-auto rounded-[10px]">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full cursor-pointer">
            <div>
              <img
                src={formData.profile || loginIcon}
                alt="login icon"
                className="rounded-full"
              />
            </div>
            <form>
              <label>
                <div className="bg-opacity-10 text-xs py-8 absolute bottom-0 w-full cursor-pointer"></div>
                <input
                  type="file"
                  className="hidden"
                  name="profile"
                  onChange={handleUploadPicture}
                />
              </label>
            </form>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid">
              <label className="font-medium">Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full h-full bg-transparent outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
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
            <div className="grid">
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
                <div className="cursor-pointer">
                  {showPassword ? (
                    <FaEyeSlash
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEye onClick={() => setShowPassword(!showPassword)} />
                  )}
                </div>
              </div>
            </div>
            <div className="grid">
              <label className="font-medium">Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter your confirm password"
                  className="w-full h-full bg-transparent outline-none"
                  onChange={handleChange}
                  onFocus={() => setConfirmPasswordError("")}
                  required
                  style={{
                    borderColor: confirmPasswordError ? "red" : "transparent",
                  }}
                />
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-sm">{confirmPasswordError}</p>
              )}
            </div>
            <button className="font-semibold bg-blue-800 hover:scale-110 transition-all hover:bg-blue-600 mt-4 text-white px-6 py-2 w-full max-w-[130px] rounded-full mx-auto block">
              Sign Up
            </button>
          </form>
          <p className="my-3">
            Already have an account?
            <Link
              to={"/login"}
              className="text-green-700 font-semibold hover:text-red-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// import React, { useState } from "react";
// import loginIcon from "../assest/signin.gif";
// import { FaEyeSlash, FaEye } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { imageToBase64 } from "../helper/ImageTobase64";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { toast } from "react-toastify";

// export default function SignUp() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     profile: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleUploadPicture = async (e) => {
//     const file = e.target.files[0];
//     const imagePic = await imageToBase64(file);
//     setFormData((previous) => ({
//       ...previous,
//       profile: imagePic,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Please check password and confirm password");
//       return;
//     }

//     try {
//       const response = await fetch(SummaryAPI.signUP.url, {
//         method: SummaryAPI.signUP.method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message);
//       } else {
//         toast.error(data.message || "Registration failed");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <section id="sign-up">
//       <div className="mx-auto container px-4 h-[90vh]">
//         <div className="p-5 w-full bg-white max-w-md mx-auto rounded-[10px]">
//           <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full cursor-pointer">
//             <div>
//               <img
//                 src={formData.profile || loginIcon}
//                 alt="login icon"
//                 className="rounded-full"
//               />
//             </div>
//             <form>
//               <label>
//                 <div className="bg-opacity-10 text-xs py-8 absolute bottom-0 w-full cursor-pointer"></div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   name="profile"
//                   onChange={handleUploadPicture}
//                 />
//               </label>
//             </form>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="grid">
//               <label className="font-medium">Name:</label>
//               <div className="bg-slate-100 p-2">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter your name"
//                   className="w-full h-full bg-transparent outline-none"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
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
//             <div className="grid">
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
//                 <div className="cursor-pointer">
//                   {showPassword ? (
//                     <FaEyeSlash
//                       onClick={() => setShowPassword(!showPassword)}
//                     />
//                   ) : (
//                     <FaEye onClick={() => setShowPassword(!showPassword)} />
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="grid">
//               <label className="font-medium">Confirm Password:</label>
//               <div className="bg-slate-100 p-2 flex">
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Enter your confirm password"
//                   className="w-full h-full bg-transparent outline-none"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <button className="font-semibold bg-blue-800 hover:scale-110 transition-all hover:bg-blue-600 mt-4 text-white px-6 py-2 w-full max-w-[130px] rounded-full mx-auto block">
//               Sign Up
//             </button>
//           </form>
//           <p className="my-3">
//             Already have an account?
//             <Link
//               to={"/login"}
//               className="text-green-700 font-semibold hover:text-red-700 hover:underline"
//             >
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
