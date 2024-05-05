import React, { useEffect, useState } from "react"
import { BiAlignMiddle, BiMoon, BiSearchAlt, BiSun } from "react-icons/bi"

import ProfileImage from '../../../../assets/profile/9904258.png'
import { useLocation, useNavigate } from "react-router-dom"
import { handleLogout } from "../../../../config/middleware/services/auth/auth"
import { theme } from "../../../../config/middleware/hooks/theme"

import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Navbar = ({ toggleSidebar }) => {

  const dataThemes = localStorage.getItem('theme')

  const today = new Date()
  const formattedDate = format(today, 'dd MMMM yyyy', { locale: id })

  const location = useLocation()

  const navigate = useNavigate()

  const [themes, setThemes] = useState(dataThemes)

  const handleCheckboxChange = () => {
    setThemes(prevTheme => (prevTheme === 'cupcake' ? 'dark' : 'cupcake'))
  }

  const getPathSegments = (path) => {
    return path.split("/").filter((segment) => segment.trim() !== "")
  }

  const pathSegments = getPathSegments(location.pathname)

  useEffect(() => {
    localStorage.setItem('theme', themes)
    theme({ theme: themes })
  }, [themes])

  const logout = async (e) => {
    e.preventDefault()

    try {
        await handleLogout((handleResult) => {
            if(handleResult == 'success' || handleResult == 'superuser'){
                navigate('/auth/sesion-end')
            }else{
                console.log('user biasa')
            }
        })
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <>
      <div className="navbar flex justify-between items-center h-ful w-full">
        <div className="flex items-center">
          <button
            type="button"
            id="sidebar-toggle-button"
            onClick={toggleSidebar}
            className="btn btn-ghost lg:hidden"
          >
            <BiAlignMiddle className="w-5 h-5" />
          </button>
          <div className="text-2xl ml-4 breadcrumbs font-semibold">
            <ul>
              {pathSegments.length === 0 && (
                <li>
                  <a href="#">Dashboard</a>
                </li>
              )}
              {pathSegments.map((segment, index) => (
                <li key={index}>
                  <a className="capitalize" href="#">
                    {index === 0 && pathSegments.length > 0
                      ? `${segment.replace(/_/g, " ")}`
                      : ` ${segment.replace(/_/g, " ")}`} 
                  </a>
                </li>
              ))}
            </ul>
            <span className="text-sm font-normal">{formattedDate}</span>
          </div>
        </div>

        <div className="flex-none gap-4 mr-4">
          <div className="flex items-center gap-2">
            <label className="swap swap-rotate">
              <input type="checkbox"  checked={themes === 'dark'} onChange={handleCheckboxChange} />
              {themes === 'dark' ? (
                <BiMoon className="h-6 w-6 text-primary" />
              ) : (
                <BiSun className="h-6 w-6 text-primary" />
              )}
            </label>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0}>
              <label className="btn btn-ghost btn-circle avatar bg-base-200">
                <div className="w-20 rounded-full">
                  <img src={ProfileImage} />
                </div>
              </label>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar