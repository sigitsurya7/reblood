import React, { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import Navbar from "./element/navbar"
import SideBar from "./element/sidebar"
import { FaCog, FaHome, FaPlus, FaSearch } from "react-icons/fa"
import { FaCalendar, FaCompass } from "react-icons/fa6"

const AdminLayout = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    if (sidebarOpen) {
      const closeSidebarOnOutsideClick = (event) => {
        const sidebar = document.getElementById("default-sidebar")
        const toggleButton = document.getElementById("sidebar-toggle-button")

        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          toggleButton &&
          !toggleButton.contains(event.target)
        ) {
          setSidebarOpen(false)
        }
      }

      document.addEventListener("click", closeSidebarOnOutsideClick)

      return () => {
        document.removeEventListener("click", closeSidebarOnOutsideClick)
      }
    }
  }, [sidebarOpen])

  return (
    <>
      <div className={`flex bg-base-200`}>
        <SideBar open={sidebarOpen} />
        <div className="lg:pl-64 flex flex-col w-full">
          <div className="sticky bg-base-200 top-0 z-20">
            <Navbar toggleSidebar={toggleSidebar} />
          </div>
          <div className={`min-h-screen mb-36 bg-base-200 p-4 ${sidebarOpen ? "overflow-hidden" : ""}`}>
            {/* BreadCumb */}
            <Outlet />
          </div>
          <div className="fixed w-full bottom-5 p-4 z-20 bg-transparent lg:hidden block">
            <div className="px-7 bg-base-100 shadow-lg rounded-2xl mb-5">
                <div className="flex">
                    <div className="flex-1 group">
                        <NavLink to={'/dashboard'} className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-secondary border-b-2 border-transparent group-hover:border-secondary">
                            <span className="flex flex-col justify-center items-center px-1 pt-1 pb-2">
                                <FaHome className="text-2xl pt-1 mb-1 block" />
                                <span className="block text-xs pb-1">Home</span>
                            </span>
                        </NavLink>
                    </div>
                    <div className="flex-1 group">
                        <NavLink to={'/create'} className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-secondary border-b-2 border-transparent group-hover:border-secondary">
                            <span className="flex flex-col justify-center items-center px-1 pt-1 pb-2">
                                <FaPlus className="text-2xl pt-1 mb-1 block" />
                                <span className="block text-xs pb-1">Create</span>
                            </span>
                        </NavLink>
                    </div>
                    <div className="flex-1 group">
                        <NavLink to={'/jadwal'} className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-secondary border-b-2 border-transparent group-hover:border-secondary">
                            <span className="flex flex-col justify-center items-center px-1 pt-1 pb-2">
                                <FaCalendar className="text-2xl pt-1 mb-1 block" />
                                <span className="block text-xs pb-1">Jadwal</span>
                            </span>
                        </NavLink >
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout