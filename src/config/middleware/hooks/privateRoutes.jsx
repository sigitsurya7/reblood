import { Navigate } from "react-router-dom";
import AdminLayout from "../../../component/layout/adminLayout";

const PrivateRoutes = () => {
    const auth = localStorage.getItem('token');
    return auth ? <AdminLayout /> : (
        <Navigate to="/auth/login" />
    );
}

export default PrivateRoutes