import { Navigate } from "react-router-dom";
import AdminLayout from "../../../component/layout/adminLayout";

const PrivateRoutes = () => {
    const auth = localStorage.getItem('token');
    const statusLock = localStorage.getItem('status_lock');
    if(statusLock == 1){
        return <Navigate to="/auth/lockscreen" />
    }else{
        return auth && statusLock == 0 ? <AdminLayout /> : (
            <Navigate to="/auth/login" />
        );
    }
}

export default PrivateRoutes