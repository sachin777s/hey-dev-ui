import { Outlet } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import RightSidebar from './components/RightSidebar'

export default function Layout() {

    return (
        <div className='mx-auto h-screen max-w-[1340px] flex justify-center flex-row'>

            <Sidebar />
            <main className='w-full lg:w-[60%] border border-l-1 border-r-1 z-0'>
                <Outlet />
            </main>
            <RightSidebar />
        </div>
    )
}