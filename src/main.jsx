import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "./Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import Notifications from "./pages/Notifications/Notifications.jsx";
import Messages from "./pages/Messages/Messages.jsx";
import Communities from "./pages/Communities/Communities.jsx";
import Hackathons from "./pages/Hackathons/Hackathons.jsx";
import Jobs from "./pages/Jobs/Jobs.jsx";
import Organizations from "./pages/Ogranizations/Organizations.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Posts from "./pages/Profile/components/Posts.jsx";
import Replies from "./pages/Profile/components/Replies.jsx";
import Likes from "./pages/Profile/components/Likes.jsx";
import MessageUser from "./pages/Messages/components/MessageUser.jsx";
import UserList from "./pages/Messages/components/UserList.jsx";
import CommunityHome from "./pages/Communities/components/CommunityHome.jsx";
import StartCommunity from "./pages/Communities/components/StartCommunity.jsx";
import SingleCommunityPage from "./pages/Communities/components/SingleCommunity/SIngleCommunity.jsx";
import Members from "./pages/Communities/components/SingleCommunity/Members.jsx";
import SingleCommunityHome from "./pages/Communities/components/SingleCommunity/SingleCommunityHome.jsx";
import JobsHome from "./pages/Jobs/components/JobsHome.jsx";
import SingleJob from "./pages/Jobs/components/SingleJob.jsx";
import ApplyJob from "./pages/Jobs/components/ApplyJob.jsx";
import EditProfile from "./pages/Edit-Profile/EditProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/messages",
        element: <Messages />,
        children: [
          {
            path: "",
            element: <UserList />,
          },
          {
            path: ":id",
            element: <MessageUser />,
          },
        ],
      },
      {
        path: "/communities",
        element: <Communities />,
        children: [
          {
            path: "",
            element: <CommunityHome />,
          },
          {
            path: ":id",
            element: <SingleCommunityPage />,
            children: [
              {
                path: "",
                element: <SingleCommunityHome />,
              },
              {
                path: "members",
                element: <Members />,
              },
            ],
          },
          {
            path: "start-community",
            element: <StartCommunity />,
          },
        ],
      },
      {
        path: "/hackathons",
        element: <Hackathons />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
        children: [
          {
            path: "",
            element: <JobsHome />,
          },
          {
            path: ":id",
            element: <SingleJob />,
          },
          {
            path: ":id/apply",
            element: <ApplyJob />,
          },
        ],
      },
      {
        path: "/organizations",
        element: <Organizations />,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            path: "posts",
            element: <Posts />,
          },
          {
            path: "replies",
            element: <Replies />,
          },
          {
            path: "likes",
            element: <Likes />,
          },
        ],
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </StrictMode>
);
