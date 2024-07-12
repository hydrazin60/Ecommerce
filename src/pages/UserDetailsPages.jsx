import React, { useEffect } from "react";
import { SummaryAPI } from "../utils/SummaryAPI";

export default function UserDetailsPages() {
  const fetchUserDetail = async () => {
    try {
      const response = await fetch(SummaryAPI.getCurrentUserdetails.url, {
        method: SummaryAPI.getCurrentUserdetails.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseUserData = await response.json();
      console.log(responseUserData);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return <div>User details</div>;
}
