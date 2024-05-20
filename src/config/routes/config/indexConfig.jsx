// Icons
import { BiSolidDashboard, BiSpeaker } from "react-icons/bi"
import { getRole } from "../../middleware/hooks/authConfig"
import Dashboard from "../../../pages/AdminPages/dashboard"
import { BottomNav } from "./module/bottomNav"
// Dashboar Page

// Module

const dashboardRoute = {
    name: 'Dashboard',
    path: '/',
    element: <Dashboard />,
    icon: <BiSolidDashboard />
}

const role = getRole()

const Menu = () => {
    
    if (role === 'User') {
        return [dashboardRoute, BottomNav]
    } else if(role === 'production') {
        return [dashboardRoute]
    } else if(role === 'she'){
        return [dashboardRoute]
    }else{
        return [dashboardRoute]
    }
}

export const Routers = Menu()