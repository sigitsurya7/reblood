import { BiNote } from "react-icons/bi";
import Dashboard from "../../../../pages/AdminPages/dashboard";
import CreateHome from "../../../../pages/AdminPages/home/create";
import JadwalHome from "../../../../pages/AdminPages/home/jadwal";
import ProfilePage from "../../../../pages/AdminPages/settings/profile";
import EditProfile from "../../../../pages/AdminPages/settings/editProfile";

export const BottomNav = {
    name: 'Navigasi Bawah',
    icon: <BiNote />,
    singeRoute: true,
    parent: true,
    children: [
        {
            name: "Create",
            path: '/create',
            element: <CreateHome />
        },
        {
            name: "Jadwal",
            path: '/jadwal',
            element: <JadwalHome />
        },
        {
            name: "Profile",
            path: '/profile',
            element: <ProfilePage />
        },
        {
            name: "Profile",
            path: '/profile/edit',
            element: <EditProfile />
        }
    ]
}