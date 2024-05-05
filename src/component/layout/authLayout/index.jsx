import React from "react"
import { Outlet } from "react-router-dom"
import banner from '../../../assets/img/bloodDonor.jpg'
import { MdBloodtype } from "react-icons/md"

const AuthLayout = () => {
    return(
        <React.Fragment>
            <div className="w-screen h-screen bg-base-200 grid grid-cols-2">
                <div className='w-full bg-center sm:hidden lg:block bg-cover' style={{ backgroundImage: `url(${banner})` }} />
                <div className="w-full lg:col-span-1 sm:col-span-2 flex items-center justify-center bg-base-100">
                    <div className="lg:w-1/2 w-96 flex flex-col gap-4 p-8">
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <MdBloodtype className="text-5xl" />
                            <h1 className="font-semibold text-3xl">{import.meta.env.VITE_SHORT_NAME}</h1>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AuthLayout