import {BiGroup, BiSpeaker, BiUser, BiUserCheck} from 'react-icons/bi'
import { Greeting, formatDate } from '../../config/middleware/hooks/greeting'
import { useEffect, useState } from 'react'
import { get } from '../../config/middleware/hooks/gateway'
import { FaClock, FaEye, FaWhatsapp } from 'react-icons/fa6'
import men from '../../assets/profile/men.png'
import women from '../../assets/profile/women.png'

const Dashboard = () => {
    var nama = localStorage.getItem('fullname')
    var greeting = Greeting()

    const [state, setState] = useState([])

    function getDataReqDarah(page)
    {
        let pages = page ?? 1
        get(`admin/reqdarah?page=${pages}`).then((response) => {
            setState(response)
        })
    }

    useEffect(() => {
        getDataReqDarah()

        console.log(state)
    }, [])

    return(
        <>
            <span className='text-xl font-semibold capitalize'>{greeting} {nama}</span>

            <div className='grid grid-cols-1 lg:grid-cols-3 my-4 gap-4'>
                {state ?
                
                    state.data?.map((value, index) => {
                        return(
                            <>
                                <div key={index} className='card rounded-tr-[5rem] p-3 shadow-md bg-base-100'>
                                    <div className='flex flex-col gap-1 p-4 z-10'>
                                        <div className='flex justify-between'>
                                            <div className='flex flex-col items-center'>
                                                <span className='font-semibold'>Golongan Darah</span>
                                                <span className='text-3xl text-secondary font-semibold'>{value.gol_darah}</span>
                                            </div>
                                            <div className='flex flex-col w-20'>
                                                <span className='font-semibold flex items-center gap-1'><FaClock /> Target</span>
                                                <span className='font-semibold text-sm text-wrap'>{formatDate(value.tgl_target)}</span>
                                            </div>
                                        </div>

                                        <div className='divider'></div>

                                        <div className='flex justify-between items-baseline gap-1 flex-wrap'>
                                            <div className='flex flex-col items-center'>
                                                <span className='font-semibold'>{value.gender == 'L' ? 'Laki-Laki' : 'Perempuan'}</span>
                                                <span>Gender</span>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <span className='font-semibold'>{value.sakit}</span>
                                                <span>Sakit</span>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <span className='font-semibold'>{value.created_by}</span>
                                                <span>Pemohon</span>
                                            </div>
                                        </div>

                                        <div className='flex gap-3 justify-end mt-4 w-full'>
                                            <button type="button" className='btn btn-circle text-white btn-success'><FaWhatsapp /></button>
                                            <button type="button" className='btn btn-circle text-white btn-info'><FaEye /></button>
                                        </div>
                                    </div>
                                    <img className='w-24 rounded z-1 absolute top-[2rem] left-[-1rem]' src={value.gender == 'L' ? men : women} alt="" />
                                </div>
                            </>
                        )
                    })
                
                : []}

            </div>
        </>
    )
}

export default Dashboard