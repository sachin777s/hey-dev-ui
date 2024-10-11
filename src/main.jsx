import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react'
import Layout from './Layout.jsx';
import Home from "./pages/Home/Home.jsx"
import Explore from './pages/Explore/Explore.jsx';
import Notifications from "./pages/Notifications/Notifications.jsx"
import Messages from "./pages/Messages/Messages.jsx"
import Communities from "./pages/Communities/Communities.jsx"
import Hackathons from "./pages/Hackathons/Hackathons.jsx"
import Jobs from "./pages/Jobs/Jobs.jsx"
import Organizations from "./pages/Ogranizations/Organizations.jsx"
import Profile from "./pages/Profile/Profile.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/explore",
        element: <Explore />
      },
      {
        path: "/notifications",
        element: <Notifications />
      },
      {
        path: "/messages",
        element: <Messages />
      },
      {
        path: "/communities",
        element: <Communities />
      },
      {
        path: "/hackathons",
        element: <Hackathons />
      },
      {
        path: "/jobs",
        element: <Jobs />
      },
      {
        path: "/organizations",
        element: <Organizations />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </StrictMode>,
)
