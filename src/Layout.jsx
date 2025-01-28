import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import { useEffect, useState } from "react";
import Authentication from "./pages/Auth/Authentication";
import { useAuth, useSignIn, useUser } from "@clerk/clerk-react";

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { isLoaded, signIn } = useSignIn();
  const { getToken, isSignedIn } = useAuth();
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      console.log(token);
      setToken(token);
    };
  }, []);

  return (
    <>
      {isSignedIn ? (
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
