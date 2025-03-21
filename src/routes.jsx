import Layout from "./Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import Notifications from "./pages/Notifications/Notifications.jsx";
import Messages from "./pages/Messages/Messages.jsx";
import Communities from "./pages/Communities/Communities.jsx";
import Jobs from "./pages/Jobs/Jobs.jsx";
import Company from "./pages/Company/Company.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Posts from "./pages/Profile/components/Posts.jsx";
import Replies from "./pages/Profile/components/Replies.jsx";
import Likes from "./pages/Profile/components/Likes.jsx";
import MessageUser from "./pages/Messages/components/MessageUser.jsx";
import UserList from "./pages/Messages/components/UserList.jsx";
import CommunitiesHome from "./pages/Communities/components/CommunitiesHome.jsx";
import StartCommunity from "./pages/Communities/components/StartCommunity.jsx";
import Members from "./pages/Communities/components/SingleCommunity/Members.jsx";
import SingleCommunity from "./pages/Communities/components/SingleCommunity/SingleCommunity.jsx";
import JobsHome from "./pages/Jobs/components/JobsHome.jsx";
import SingleJob from "./pages/Jobs/components/SingleJob.jsx";
import ApplyJob from "./pages/Jobs/components/ApplyJob.jsx";
import EditProfile from "./pages/Edit-Profile/EditProfile.jsx";
import About from "./pages/Profile/components/About.jsx";
import CreateCompany from "./pages/Create-Company/CreateCompany.jsx";
import JobsPage from "./pages/Company/components/JobsPage.jsx";
import ApplicantsPage from "./pages/Company/components/ApplicantsPage.jsx";
import AboutPage from "./pages/Company/components/AboutPage.jsx";
import CommunityPosts from "./pages/Communities/components/SingleCommunity/CommunityPosts.jsx";
import AboutCommunity from "./pages/Communities/components/SingleCommunity/AboutCommunity.jsx";
import SinglePostPage from "./pages/SinglePostPage/SinglePostPage.jsx";
import Authentication from "./pages/Auth/Authentication.jsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "post/:postId",
        element: <SinglePostPage />,
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
            path: ":username",
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
            element: <CommunitiesHome />,
          },
          {
            path: ":communityId",
            element: <SingleCommunity />,
            children: [
              {
                path: "posts",
                element: <CommunityPosts />,
              },
              {
                path: "about",
                element: <AboutCommunity />,
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
        path: "/jobs",
        element: <Jobs />,
        children: [
          {
            path: "",
            element: <JobsHome />,
          },
          {
            path: ":jobId",
            element: <SingleJob />,
          },
          {
            path: ":jobId/apply",
            element: <ApplyJob />,
          },
        ],
      },
      {
        path: "/company",
        element: <Company />,
        children: [
          {
            path: "jobs",
            element: <JobsPage />,
          },
          {
            path: "applicants",
            element: <ApplicantsPage />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
        ],
      },
      {
        path: ":username",
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
          {
            path: "about",
            element: <About />,
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
      {
        path: "create-company",
        element: <CreateCompany />,
      },
    ],
  },
  {
    path: "/authentication",
    element: <Authentication />,
  },
]);
