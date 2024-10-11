import { Outlet } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import RightSidebar from './components/RightSidebar'

export default function Layout() {

    return (
        <div className='mx-auto h-screen max-w-[1340px] grid grid-cols-10 grid-rows-1 gap-2'>
            <Sidebar />
            <main className='col-span-5 border border-l-1 border-r-1'>
                <Outlet />
            </main>
            <RightSidebar />
        </div>
    )
}