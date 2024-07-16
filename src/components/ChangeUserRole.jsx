import React, { useState } from "react";
import ROLE from "../helper/ROLE";
import { IoMdClose } from "react-icons/io";
import { SummaryAPI } from "../utils/SummaryAPI";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc, authToken }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const fetchResponse = await fetch(SummaryAPI.updateUser.url, {
        method: SummaryAPI.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Ensure authToken is passed
        },
        body: JSON.stringify({
          userId:  userId ,
          role: userRole,
        }),
      });

      const responseData = await fetchResponse.json();
      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("An error occurred while updating the user role.");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role </h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <p>Role : {role}</p>
        <div className="flex items-center justify-between my-5">
          <p> Change Role :</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Update User
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;



// import React, { useState } from "react";
// import ROLE from "../helper/ROLE";
// import { IoMdClose } from "react-icons/io";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { toast } from "react-toastify";

// const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
//   const [userRole, setUserRole] = useState(role);

//   const handleOnChangeSelect = (e) => {
//     setUserRole(e.target.value);
//   };

//   const updateUserRole = async () => {
//     const fetchResponse = await fetch(SummaryAPI.updateUser.url, {
//       method: SummaryAPI.updateUser.method,
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: userId,
//         role: userRole,
//       }),
//     });
//     const responseData = await fetchResponse.json();
//     if (responseData.success) {
//       toast.success(responseData.message);
//       onClose();
//       callFunc();
//     }
//   };

//   return (
//     <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
//       <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
//         <button className="block ml-auto" onClick={onClose}>
//           <IoMdClose />
//         </button>
//         <h1 className="pb-4 text-lg font-medium">Change User Role </h1>
//         <p>Name : {name}</p>
//         <p>Email : {email}</p>
//         <p>Role : {role}</p>
//         <div className="flex items-center justify-between my-5">
//           <p> Change Role :</p>
//           <select
//             className="border px-4 py-1"
//             value={userRole}
//             onChange={handleOnChangeSelect}
//           >
//             {Object.values(ROLE).map((el) => (
//               <option value={el} key={el}>
//                 {el}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
//           onClick={updateUserRole}
//         >
//           Update User
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChangeUserRole;
