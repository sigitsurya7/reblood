import { BiNote } from "react-icons/bi";
import Dashboard from "../../../../pages/AdminPages/dashboard";
import CreateHome from "../../../../pages/AdminPages/home/create";
import JadwalHome from "../../../../pages/AdminPages/home/jadwal";

export const BottomNav = {
    name: 'Navigasi Bawah',
    icon: <BiNote />,
    singeRoute: true,
    parent: true,
    children: [
        {
            name: "Home",
            path: '/dashboard',
            element: <Dashboard />,
        },
        {
            name: "Create",
            path: '/create',
            element: <CreateHome />
        },
        {
            name: "Jadwal",
            path: '/jadwal',
            element: <JadwalHome />
        }
    ]
}