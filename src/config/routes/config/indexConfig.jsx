// Icons
import { BiSolidDashboard, BiSpeaker } from "react-icons/bi"
import { getRole } from "../../middleware/hooks/authConfig"
import Dashboard from "../../../pages/AdminPages/dashboard"
import Pengumuman from "../../../pages/AdminPages/pengumuman"
// Dashboar Page

// Module

const dashboardRoute = {
    name: 'Dashboard',
    path: '/',
    element: <Dashboard />,
    icon: <BiSolidDashboard />
}

const pengumuman = {
    name: 'Pengumuman',
    path: '/pengumuman',
    element: <Pengumuman />,
    icon: <BiSpeaker />
}

const role = getRole()

const Menu = () => {
    
    if (role === 'User') {
        return [dashboardRoute]
    } else if(role === 'production') {
        return [dashboardRoute]
    } else if(role === 'she'){
        return [dashboardRoute]
    }else{
        return [dashboardRoute]
    }
}

export const Routers = Menu()