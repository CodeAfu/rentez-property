"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";

const logout = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      }
    );
    localStorage.removeItem("accessToken");
    console.log("Logout Success");
    window.location.reload();
  } catch (err) {
    console.error("Logout failed", err);
  }
};

export default function Logout() {
  const handleLogout = () => {
    logout();
  };
  return (
    <Button onClick={handleLogout} size="sm" variant="outline">
      Logout
    </Button>
  );
}
