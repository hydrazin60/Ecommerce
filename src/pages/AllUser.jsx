import React, { useEffect, useState } from "react";
import { SummaryAPI } from "../utils/SummaryAPI";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

export default function AllUser() {
  const [allUserList, setAllUserList] = useState([]);
  const [openUpdateRoleBox, setOpenUpdateRoleBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [authToken, setAuthToken] = useState(""); // State to hold JWT token

  const fetchDataFunction = async () => {
    try {
      const fetchData = await fetch(SummaryAPI.allUserList.url, {
        method: SummaryAPI.allUserList.method,
        credentials: "include",
      });
      const dataResponse = await fetchData.json();
      if (dataResponse.success) {
        setAllUserList(dataResponse.data);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFunction();
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenUpdateRoleBox(true);
  };

  return (
    <div>
      <table className="w-full AllUserListTable">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Update Date</th>
            <th>Profile</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {allUserList.map((element, index) => (
            <tr key={element._id}>
              <td>{index + 1}</td>
              <td>{element.name}</td>
              <td>{element.email}</td>
              <td>{element.role}</td>
              <td>{moment(element.createdAt).format("L")}</td>
              <td>{moment(element.updatedAt).format("L")}</td>
              <td>
                <div className="text-4xl cursor-pointer">
                  {element.profile ? (
                    <img
                      src={element.profile}
                      className="w-9 h-9 rounded-full border-2 border-green-400 hover:border-yellow-400"
                      alt="user PP"
                    />
                  ) : (
                    <FaUserCircle />
                  )}
                </div>
              </td>
              <td>
                <button
                  className="bg-zinc-600 p-2 rounded-full hover:bg-zinc-900 hover:text-white"
                  onClick={() => handleEditClick(element)}
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateRoleBox && selectedUser && (
        <ChangeUserRole
          name={selectedUser.name}
          email={selectedUser.email}
          role={selectedUser.role}
          userId={selectedUser._id}
          onClose={() => setOpenUpdateRoleBox(false)}
          callFunc={fetchDataFunction}
          authToken={authToken} // Pass authToken to ChangeUserRole component
        />
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { SummaryAPI } from "../utils/SummaryAPI";
// import { toast } from "react-toastify";
// import { FaUserCircle } from "react-icons/fa";
// import moment from "moment";
// import { MdModeEdit } from "react-icons/md";
// import ChangeUserRole from "../components/ChangeUserRole";

// export default function AllUser() {
//   const [allUserList, setAllUserList] = useState([]);
//   const [openUpdateRoleBox, setOpenUpdateRoleBox] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const fetchDataFunction = async () => {
//     try {
//       const fetchData = await fetch(SummaryAPI.allUserList.url, {
//         method: SummaryAPI.allUserList.method,
//         credentials: "include",
//       });
//       const dataResponse = await fetchData.json();
//       if (dataResponse.success) {
//         setAllUserList(dataResponse.data);
//       } else if (dataResponse.error) {
//         toast.error(dataResponse.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchDataFunction();
//   }, []);

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setOpenUpdateRoleBox(true);
//   };

//   return (
//     <div>
//       <table className="w-full AllUserListTable">
//         <thead>
//           <tr>
//             <th>Sr.</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Created Date</th>
//             <th>Update Date</th>
//             <th>Profile</th>
//             <th>Edit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allUserList.map((element, index) => (
//             <tr key={element._id}>
//               <td>{index + 1}</td>
//               <td>{element.name}</td>
//               <td>{element.email}</td>
//               <td>{element.role}</td>
//               <td>{moment(element.createdAt).format("L")}</td>
//               <td>{moment(element.updatedAt).format("L")}</td>
//               <td>
//                 <div className="text-4xl cursor-pointer">
//                   {element.profile ? (
//                     <img
//                       src={element.profile}
//                       className="w-9 h-9 rounded-full border-2 border-green-400 hover:border-yellow-400"
//                       alt="user PP"
//                     />
//                   ) : (
//                     <FaUserCircle />
//                   )}
//                 </div>
//               </td>
//               <td>
//                 <button
//                   className="bg-zinc-600 p-2 rounded-full hover:bg-zinc-900 hover:text-white"
//                   onClick={() => handleEditClick(element)}
//                 >
//                   <MdModeEdit />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {openUpdateRoleBox && selectedUser && (
//         <ChangeUserRole
//           name={selectedUser.name}
//           email={selectedUser.email}
//           role={selectedUser.role}
//           userId={selectedUser._id}
//           onClose={() => setOpenUpdateRoleBox(false)}
//           callFunc={fetchDataFunction}
//         />
//       )}
//     </div>
//   );
// }
