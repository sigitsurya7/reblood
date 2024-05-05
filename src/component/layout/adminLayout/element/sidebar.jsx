import React, { useEffect, useState } from "react"
import { BiBook, BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi"
import { NavLink, useLocation } from "react-router-dom"
import { Routers } from "../../../../config/routes/config/indexConfig"
const ReactName = import.meta.env

const SideBar = ({ open }) => {

  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState({})
  const [activeTab, setActiveTab] = useState(0)


  const toggleDropdown = (index) => {
    setOpenDropdown((prevOpenDropdown) => ({
      ...prevOpenDropdown,
      [index]: !prevOpenDropdown[index],
    }))
  }

  useEffect(() => {
    const currentPath = location.pathname
    Routers.forEach((item, index) => {
      if (item.path === currentPath) {
        setActiveTab(index)
        return
      }
      if (item.children) {
        const childIndex = item.children.findIndex(
          (childItem) => childItem.path === currentPath
        )
        if (childIndex !== -1) {
          setActiveTab(index)
          setOpenDropdown((prevOpenDropdown) => ({
            ...prevOpenDropdown,
            [index]: true,
          }))
          return
        }
      }
    })
  }, [location.pathname])

  const renderMenu = (item, index, parentIndex) => {
    const isParentOpen = openDropdown[index]
    const isActiveParent = activeTab === index

    if (item.secondary) {
      return null
    }

    if (item.module){
      return <span key={index} className="my-2 mx-2 font-semibold text-sm">{item.moduleName}</span>
    }

    return (
      <li className="mb-2" key={index}>
        {item.parent && item.children ? (
          <>
            <span
              className={`cursor-pointer flex justify-between dark:hover:bg-primary hover:text-black items-center ${
                isActiveParent ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                toggleDropdown(index)
                setActiveTab(isActiveParent ? null : index)
              }}
            >
              <div className="flex items-center gap-2">
                <div className="text-xl">{item.icon}</div>
                {item.name}
              </div>
              <div>
                {isParentOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
              </div>
            </span>
          </>
        ) : (
          <NavLink
            to={item.path}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "bg-primary text-white" : ""
            }
          >
            <div className="flex gap-2 items-center">
              <div className="text-xl">{item.icon}</div>
              {item.name}
            </div>
          </NavLink>
        )}

        {isParentOpen && item.children && (
          <ul className="">
            {item.children.map((childItem, childIndex) => (
              <li className="my-2" key={childIndex}>
                {childItem.parent && childItem.children ? (
                  <span
                    className="cursor-pointer dark:hover:bg-primary flex justify-between items-center"
                    onClick={() =>
                      toggleDropdown(`child-${index}-${childIndex}`)
                    }
                  >
                    <div className="flex gap-2">
                      <div className="text-xl">{childItem.icon}</div>
                      {childItem.name}
                    </div>
                    <div>
                      {openDropdown[`child-${index}-${childIndex}`] ? (
                        <BiSolidUpArrow />
                      ) : (
                        <BiSolidDownArrow />
                      )}
                    </div>
                  </span>
                ) : (
                  <NavLink
                    to={childItem.path}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                    }
                  >
                    {childItem.name}
                  </NavLink>
                )}

                {childItem.parent &&
                  openDropdown[`child-${index}-${childIndex}`] &&
                  childItem.children && (
                    <ul className="">
                      {childItem.children.map((subChildItem, subChildIndex) => (
                        <li className="mb-2" key={subChildIndex}>
                          {subChildItem.parent && subChildItem.children ? (
                            <span
                              className="cursor-pointer dark:hover:bg-primary flex justify-between items-center"
                              onClick={() =>
                                toggleDropdown(
                                  `subchild-${index}-${childIndex}-${subChildIndex}`,
                                )
                              }
                            >
                              <div className="flex gap-2">
                                <div className="text-xl">
                                  {subChildItem.icon}
                                </div>
                                {subChildItem.name}
                              </div>
                              <div>
                                {openDropdown[
                                  `subchild-${index}-${childIndex}-${subChildIndex}`
                                ] ? (
                                  <BiSolidUpArrow />
                                ) : (
                                  <BiSolidDownArrow />
                                )}
                              </div>
                            </span>
                          ) : (
                            <NavLink
                              to={subChildItem.path}
                              className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                              }
                            >
                              {subChildItem.name}
                            </NavLink>
                          )}

                          {subChildItem.parent &&
                            openDropdown[
                              `subchild-${index}-${childIndex}-${subChildIndex}`
                            ] &&
                            subChildItem.children && (
                              <ul className="">
                                {subChildItem.children.map(
                                  (thirdChildItem, thirdChildIndex) => (
                                    <li key={thirdChildIndex}>
                                      <NavLink
                                        to={thirdChildItem.path}
                                        className={({ isActive, isPending }) =>
                                          isPending ? "pending" : isActive ? "bg-primary text-white" : ""
                                        }
                                      >
                                        {thirdChildItem.name}
                                      </NavLink>
                                    </li>
                                  ),
                                )}
                              </ul>
                            )}
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <aside
      id="default-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 bg-base-100 h-screen transition-transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <button className="btn btn-ghost flex items-center text-xl w-full py-2 mb-4 mt-2">
           <BiBook /> {ReactName.VITE_SHORT_NAME}
        </button>
        <p className="text-center font-bold mb-4">{ReactName.VITE_APP}</p>

        <ul className="menu menu-md menu-vertical my-10 capitalize font-medium">
          {Routers.map((item, index) => renderMenu(item, index))}
        </ul>
      </div>
    </aside>
  )
}

export default SideBar
