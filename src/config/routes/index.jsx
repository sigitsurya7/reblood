// CSS
import '../../assets/css/tailwind.css'
// react-router-dom
import { Route, BrowserRouter as Router, Routes, Outlet, Navigate } from 'react-router-dom'
// Layout Login
import AuthLayout from '../../component/layout/authLayout'
import PrivateRoutes from '../middleware/hooks/privateRoutes'
import Login from '../../pages/authPages/login'
import Recovery from '../../pages/authPages/recovery'
import NotFound from '../../pages/error/notFound'
import Register from '../../pages/authPages/register'
import LockScreen from '../../pages/authPages/lockscreen'
import { Routers } from './config/indexConfig'

const RouteIndex = () => {
    return(
        <Router>
            <Routes>
                {/* Auth Admin */}
                <Route path='/' element={<PrivateRoutes />}>
                    { Routers ? Routers.map((route, index) => {
                        if (route.parent) {
                            return route.children.map((routeParent, childIndex) => {
                            if (routeParent.parent) {
                                return routeParent.children.map((routeParentC, grandChildIndex) => {
                                if (routeParentC.parent) {
                                    return routeParentC.children.map((routeParentCG, grandChildChildIndex) => (
                                        <Route
                                            key={`${index}-${childIndex}-${grandChildIndex}-${grandChildChildIndex}`}
                                            path={routeParentCG.path}
                                            element={routeParentCG.element}
                                        />
                                    ))
                                } else {
                                    return (
                                        <Route
                                            key={`${index}-${childIndex}-${grandChildIndex}`}
                                            path={routeParentC.path}
                                            element={routeParentC.element}
                                        />
                                    )
                                }
                                })
                            } else {
                                return (
                                    <Route
                                        key={`${index}-${childIndex}`}
                                        path={routeParent.path}
                                        element={routeParent.element}
                                    />
                                )
                            }
                            })
                        } else {
                            return (
                                <Route key={index} path={route.path} element={route.element} />
                            )
                        }
                    }) : [] }
                </Route>
                {/* Auth Layout */}
                <Route path='/auth' element={<AuthLayout />}>
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/recovery' element={<Recovery />} />
                    <Route path='/auth/daftar' element={<Register />} />
                    <Route path='/auth/lockscreen' element={<LockScreen />} />
                    <Route path='/auth/sesion-end' element={<PrivateRoutes />} />
                </Route>

                {/* Error */}
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default RouteIndex