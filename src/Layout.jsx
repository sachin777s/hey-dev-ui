import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import { useEffect, useState } from "react";
import Authentication from "./pages/Auth/Authentication";
import { useAuth, useSignIn, useUser } from "@clerk/clerk-react";
import API from "./api";
import { useDispatch } from "react-redux";
import {
  fetchUserFailed,
  fetchUserStart,
  fetchUserSuccess,
} from "./app/slices/user";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  const dispatch = useDispatch();

  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isSignedIn) {
    return <Navigate to={"/authentication"} />;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(fetchUserStart());
        const response = await API.get(`/api/user/profile/${user.username}`);
        console.log(response.data.data);
        dispatch(fetchUserSuccess(response.data.data));
      } catch (error) {
        console.log(error);
        dispatch(fetchUserFailed());
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Toaster />
      <div className="mx-auto max-w-[1340px] flex justify-center items-start flex-row relative">
        <Sidebar />
        <main className="w-full min-h-screen lg:w-[60%] z-0">
          <Outlet />
        </main>
        <RightSidebar />
      </div>
    </>
  );
}
