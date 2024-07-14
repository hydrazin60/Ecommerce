import React, { useEffect, useState } from "react";
import { SummaryAPI } from "../utils/SummaryAPI";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

export default function AllUser() {
  const [allUserList, setAllUserList] = useState([]);
  const fetchDataFunction = async () => {
    try {
      const fetchData = await fetch(SummaryAPI.allUserList.url, {
        method: SummaryAPI.allUserList.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();
      if (dataResponse.success) {
        setAllUserList(dataResponse.data);
      }
      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFunction();
  }, []);
  return (
    <div>
      <table className=" w-full AllUserListTable">
        <thead>
          <tr>
            <th>Sr. </th>
            <th>Name </th>
            <th>email </th>
            <th>Role </th>
            <th>Created Date</th>
            <th>Update Data</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {allUserList.map((element, index) => {
            return (
              <tr>
                <td>{index + 1} </td>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.role}</td>
                <td>{element.createdAt}</td>
                <td>{element.updatedAt}</td>
                <td>
                  <div className="text-4xl cursor-pointer">
                    {element.profile ? (
                      <img
                        src={element.profile}
                        className="w-9 h-9 rounded-full border-2 border-green-400 hover:border-yellow-400"
                      />
                    ) : (
                      <FaUserCircle />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
