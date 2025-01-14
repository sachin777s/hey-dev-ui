import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import { useState } from "react";
import Authentication from "./pages/Auth/Authentication";

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <div className="mx-auto max-w-[1340px] flex justify-center items-start flex-row relative">
          <Sidebar />
          <main className="w-full min-h-screen lg:w-[60%] z-0">
            <Outlet />
          </main>
          <RightSidebar />
        </div>
      ) : (
        <Authentication />
      )}
    </>
  );
}
