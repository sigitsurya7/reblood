import {BiGroup, BiSpeaker, BiUser, BiUserCheck} from 'react-icons/bi'
import { Greeting, formatDate } from '../../config/middleware/hooks/greeting'
import { useEffect, useMemo, useState } from 'react'
import { get } from '../../config/middleware/hooks/gateway'
import { FaCalendar, FaClock, FaEye, FaLocationPin, FaWhatsapp } from 'react-icons/fa6'
import men from '../../assets/profile/men.png'
import women from '../../assets/profile/women.png'
import Modal from '../../component/modal/modal'
import { Link, NavLink } from 'react-router-dom'
import { createReqJadwal } from '../../config/middleware/services/master/create_permintaanDarah'

const Dashboard = () => {
    var nama = localStorage.getItem('fullname')
    var greeting = Greeting()

    const [state, setState] = useState([])
    const [select, setSelect] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [forModal, setForModal] = useState('')

    const [jadwalLocal, setJadwalLocal] = useState({
        role_id: localStorage.getItem('role_id'),
        lokasi: localStorage.getItem('lokasi'),
        role_name: localStorage.getItem('role_name'),
        gender: localStorage.getItem('gender'),
        fullname: localStorage.getItem('fullname'),
        golDarah: localStorage.getItem('golDarah'),
        email: localStorage.getItem('email'),
        userid: localStorage.getItem('userid'),
        phone: localStorage.getItem('phone'),
        tgl_jadwal: "2024-08-10",
        waktu: "",
        lokasi: localStorage.getItem('lokasi'),
        note: ""
    });

    const [jadwal, setJadwal] = useState({});

    function getDataReqDarah(page)
    {
        let pages = page ?? 1
        get(`admin/reqdarah?page=${pages}`).then((response) => {
            setState(response)
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJadwalLocal((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onClickSave = async () => {
        const newPayload = {
            data: select,
            jadwal: jadwal,
        };

        try {
            await createReqJadwal(newPayload, (handleResult) => {
                closeModal()
            });
        } catch (error) {
            console.error(error);
            closeModal();
        }

        // const response = createReqJadwal(newPayload);
        // response.then(res => {
        //     console.log(res);
        //     if (res.status == 200 || res.status == 201) {
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Save data success',
        //             text: res.data.message
        //         }).then(r => {
        //             closeModal();
        //         });
        //     }
        // }).catch(({ response: { data } }) => {
        //     handlerFormError(data);
        // }).finally(_ => closeModal());
    }

    useEffect(() => {
        getDataReqDarah()
        if (jadwalLocal) {
            const newObj = {}
            Object.keys(jadwalLocal).forEach((key) => {
                newObj[key] = jadwalLocal[key];
                newObj['docnum'] = select?.docnum;
                newObj['qty_darah'] = select?.qty_darah;
                newObj['nextapproval'] = select?.phone;
            })
            setJadwal(newObj);
        }
    }, [])

    const closeModal = () => {
        setIsModalOpen(false)
        // setJadwalLocal({});
    }

    return(
        <>
            <span className='text-xl font-semibold capitalize'>{greeting} {nama}</span>

            <div className='grid grid-cols-1 lg:grid-cols-3 my-4 gap-4'>
                {state ?
                    state.data?.map((value, index) => {
                        const show = (detail) => {
                            setForModal(detail)
                            setSelect(value)
                            setIsModalOpen(true)
                        }
                        return(
                            <>
                                <div key={index} className='card rounded-tr-[5rem] p-3 shadow-md bg-base-100'>
                                    <div className='flex flex-col p-4'>
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

                                        <div className='flex justify-between items-baseline gap-1 flex-wrap z-10'>
                                            <div className='flex flex-col items-center'>
                                                <span className='font-bold text-primary'>{value.gender == 'L' ? 'Laki-Laki' : 'Perempuan'}</span>
                                                <span>Gender</span>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <span className='font-bold text-primary'>{value.sakit}</span>
                                                <span>Sakit</span>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <span className='font-bold text-primary'>{value.created_by}</span>
                                                <span>Pemohon</span>
                                            </div>
                                        </div>
                                        <div className='flex gap-3 justify-end mt-4 w-full'>
                                            {
                                                value.phone !== localStorage.getItem('phone') &&
                                                <>
                                                    <Link to={`https://wa.me/${value.phone}`} type="button" className='btn btn-circle text-white btn-success'><FaWhatsapp /></Link>
                                                    <button type="button" className='btn btn-circle text-white btn-warning' onClick={() => show('jadwal')}><FaCalendar /></button>
                                                </>
                                            }
                                            <button type="button" className='btn btn-circle text-white btn-info' onClick={() => show('detail')}><FaEye /></button>
                                        </div>
                                    </div>
                                    <img className='w-24 rounded z-1 absolute top-[2.6rem] left-[-1rem]' src={value.gender == 'L' ? men : women} alt="" />
                                </div>
                            </>
                        )
                    })
                
                : []}

            </div>

            <Modal
                title={forModal}
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                {
                    forModal == 'detail' ? 
                    <div className='flex flex-col gap-4 flex-wrap overflow-auto'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex flex-col items-center'>
                                <span className='font-bold'>{select.created_by}</span>
                                <span>Pemohon</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <span className='font-bold'>{select.gender == 'L' ? 'Laki-Laki' : 'Perempuan'}</span>
                                <span>Gender</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <span className='font-bold'>{select.gol_darah}</span>
                                <span>Golongan Darah</span>
                            </div>
        
                            <div className='flex flex-col items-center'>
                                <span className='font-bold'>{select.sakit}</span>
                                <span>Sakit</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <span className='font-bold'>{select.qty_darah}</span>
                                <span>Jumlah Darah</span>
                            </div>
                            <div className='flex flex-col items-center'>
                                <span className='font-bold'>{select.lokasi}</span>
                                <span>Lokasi</span>
                            </div>
                            <div className='flex flex-col items-center col-span-2'>
                                <span className='font-bold'>{formatDate(select.tgl_lahir)}</span>
                                <span className='font-semibold flex items-center gap-1'><FaCalendar /> Tanggal Lahir</span>
                            </div>
                            <div className='flex flex-col items-center col-span-2'>
                                <span className='font-bold'>{formatDate(select.tgl_target)}</span>
                                <span className='font-semibold flex items-center gap-1'><FaClock /> Target</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='grid grid-cols-1 gap-4'>
                        {/* {JSON.stringify(jadwalLocal)}
                        {JSON.stringify(jadwal)} */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Label</span>
                            </div>
                            <input type="text" name="note" placeholder="Masukan note" className="input input-secondary" value={jadwalLocal?.note ? jadwalLocal?.note : ""} onChange={handleInputChange} />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Tanggal</span>
                            </div>
                            <input type="date" name="tgl_jadwal" className="input input-secondary w-full" value={jadwalLocal?.tgl_jadwal ? jadwalLocal?.tgl_jadwal : ""} onChange={handleInputChange}/>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Waktu</span>
                            </div>
                            <input type="time" name="waktu" className="input input-secondary w-full" value={jadwalLocal?.waktu ? jadwalLocal?.waktu : ""} onChange={handleInputChange}/>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Lokasi</span>
                            </div>
                            <input type="text" name="lokasi" className="input input-secondary" value={jadwalLocal?.lokasi ? jadwalLocal?.lokasi: ""} onChange={handleInputChange}/>
                        </label>

                        <button type='button' className='btn btn-secondary' onClick={onClickSave}>Submit</button>
                    </div>
                }
            </Modal>
        </>
    )
}

export default Dashboard