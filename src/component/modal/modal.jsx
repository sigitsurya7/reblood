import { Transition } from "@headlessui/react"
import React, { Fragment, useEffect, useState } from "react"
import { BiX } from "react-icons/bi"

const Modal = ({ isOpen, title, onClose, button, funcButton, children }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const keyDownHandler = event => {
            if(event.key == 'Escape'){
                onClose(false)
            }
        }
        setOpen(isOpen)
        document.addEventListener('keydown', keyDownHandler)
    }, [isOpen])


    const closeModal = () => {
        setOpen(false)
        onClose()
    }

    function renderButton(){
        return button ? <button onClick={funcButton} className="btn btn-primary capitalize">{ button }</button> : null
    }

    return open ? (
            <Transition
                appear={true}
                as={Fragment}
                show={open}
                enter="transform transition duration-[200ms]"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transform duration-400 rotate-[-120deg] transition ease-in-out"
                leaveFrom="opacity-100 scale-100 "
                leaveTo="opacity-0 scale-95"
            >
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 z-0 bg-black opacity-90" onClick={closeModal}></div>
                    {/* <div className="w-full p-8"> */}
                        <div className="bg-base-100 ml-8 mr-8 z-10 w-full p-6 rounded-lg shadow-md flex flex-col gap-4 overflow-y-scroll">
                            {/* Judul Modal */}
                            <div className="flex justify-between gap-4 items-center">
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">{title}</h2>
                                </div>

                                <button className="btn btn-circle" onClick={closeModal}>
                                    <BiX className="text-xl" />
                                </button>
                            </div>

                            {/* Konten Modal */}
                            <div className="w-full overflow-auto">
                                { children }
                            </div>

                            {/* Button */}
                            <div className="flex justify-end p-4">
                                { renderButton() }
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </Transition>
    ) : null
}

export default Modal