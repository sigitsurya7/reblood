import { BiNote } from "react-icons/bi";
import Dashboard from "../../../../pages/AdminPages/dashboard";
import CreateHome from "../../../../pages/AdminPages/home/create";
import JadwalHome from "../../../../pages/AdminPages/home/jadwal";
import ProfilePage from "../../../../pages/AdminPages/settings/profile";
import EditProfile from "../../../../pages/AdminPages/settings/editProfile";
import PermintaanDD from "../../../../pages/AdminPages/home/createMenu/permintaan";
import DonorMandiri from "../../../../pages/AdminPages/home/createMenu/donorMandiri";
import PostInfo from "../../../../pages/AdminPages/home/createMenu/postInfo";

export const BottomNav = {
    name: 'Navigasi Bawah',
    icon: <BiNote />,
    singeRoute: true,
    parent: true,
    children: [
        {
            name: "Create",
            path: '/create',
            element: <CreateHome />,
        },
        {
            name: "Permintaan Donor Darah",
            path: '/create/permintaan',
            element: <PermintaanDD />,
        },
        {
            name: "Permintaan Donor Darah",
            path: '/create/donor_mandiri',
            element: <DonorMandiri />,
        },
        {
            name: "Post Info",
            path: '/create/post_info',
            element: <PostInfo />,
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