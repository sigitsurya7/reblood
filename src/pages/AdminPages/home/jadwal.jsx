import { useState } from "react"
import { FaIdBadge, FaPhoneVolume } from "react-icons/fa6"
import { get } from "../../../config/middleware/hooks/gateway"
import { getIndonesianMonthName } from "../../../config/middleware/hooks/date"
import Modal from "../../../component/modal/modal"
import { IoIosSend } from "react-icons/io";
import { Approval, Reject } from "../../../config/middleware/services/master/approval"
import Swal from "sweetalert2"

const JadwalHome = () => {
    const [dates, setDates] = useState([])
    
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const currentDate = today.getDate();

    const [ state, setState ] = useState({
        data: [],
        modal: false,
        modalData: {},
        modalDetail: '',
        myPhone: localStorage.getItem('phone'),
    })

    const { myPhone } = state

    const generateDates = () => {
        const datesArray = []
        let hMinus = currentDate - 7;
        for (let i = hMinus; i <= daysInMonth; i++) {
            const monthName = getIndonesianMonthName(today.getMonth())
            datesArray.push({ day: i, month: monthName, date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}` })
        }
        // console.log(datesArray)
        setDates(datesArray)
    }

    function getData(){
        get(`admin/reqjadwal?filter=is_active:true,nextapproval:${myPhone}`).then((response) => {
            setState({
                ...state,
                data: response.data
            })
            
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target

        setState((prevState) => ({
            ...prevState,
            modalData: {
                ...prevState.modalData,
                [name]: value
            }
        }))
    }

    {}

    const sendData = async () => {
        const { modalData } = state;

        if(!modalData.note){
            Swal.fire({
                icon: 'warning',
                title: 'Gagal',
                text: 'Note tidak boleh kosong',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

        modalData.decision = state.modalDetail === 'approve' ? 1 : 2;

        try {
            if  (state.modalDetail === 'approve') {
                await Approval(modalData, (handleResult) => {
                    setState({...state, modal:false, modalData: {}, modalDetail: '' })
                });
            }else{
                await Reject(modalData, (handleResult) => {
                    setState({...state, modal:false, modalData: {}, modalDetail: '' })
                });
            }
        } catch (error) {
            console.error(error);
            setState({...state, modal:false, modalData: {}, modalDetail: '' })
        }
    }

    useState(() => {
        generateDates()
        getData()
    }, [])

    return(
        <>
            <div className="carousel w-full gap-4 bg-base-200">
                {dates.map((value, index) => {
                    return(
                        <div key={index} className="carousel-item cursor-pointer shadow-md flex flex-col text-xl justify-center items-center bg-red-400 p-2 rounded-lg text-white font-semibold">
                            <span>{value.day}</span>
                            {value.month}
                        </div>
                    )
                })}
            </div>
            <div className="h-max w-full grid grid-cols-1 gap-4 my-4">
                <span className="font-semibold">Jadwal Tanggal { currentDate } Bulan { getIndonesianMonthName(today.getMonth()) }</span>
                {
                    state.data.map((value, index) => {
                        
                        return(
                            <div key={index} className="bg-base-100 w-full p-4 rounded-lg rounded-tr-none shadow-md flex flex-col gap-2">
                                <span className="font-mono text-center">{ value.docnum }</span>

                                <article className="flex flex-col gap-1 text-center">
                                    <span className="underline underline-offset-1 font-semibold text-primary">Donor Berikutnya</span>
                                    <span className="text-xl font-semibold"> { value.tgl_jadwal } </span>
                                </article>

                                <div className="divider">Janji Donor</div>

                                <div className="grid grid-cols-2 gap-2 items-center">
                                    <article className="flex flex-col gap-1 items-center">
                                        <span className="underline underline-2 text-md font-semibold">Label</span>
                                        <span className="font-semibold capitalize">{value.note}</span>
                                    </article>
                                    <article className="flex flex-col gap-1 items-center">
                                        <span className="underline underline-2 text-md font-semibold">Tanggal</span>
                                        <span className="font-semibold capitalize">{value.tgl_jadwal}</span>
                                    </article>
                                    <article className="flex flex-col gap-1 items-center">
                                        <span className="underline underline-2 text-md font-semibold">Waktu</span>
                                        <span className="font-semibold capitalize">{value.waktu}</span>
                                    </article>
                                    <article className="flex flex-col gap-1 items-center">
                                        <span className="underline underline-2 text-md font-semibold">Lokasi</span>
                                        <span className="font-semibold capitalize">{value.lokasi}</span>
                                    </article>
                                </div>

                                <div className="divider"></div>

                                <div className="flex gap-4  justify-end min-w-fit">
                                    <button onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: 'reject'})}} className="btn btn-error">Reject</button>
                                    <button onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: 'approve'})}} className="btn btn-primary">Approve</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <Modal
                title={state.modalDetail}
                isOpen={state.modal}
                onClose={() => setState({...state, modal:false, modalData: {}, modalDetail: '' })}
                button={state.modalDetail === 'approve' ? ['Send'] : ['Reject']}
                color={state.modalDetail === 'approve'? ['btn-primary'] : ['btn-error']}
                funcButton={[sendData]}
                icon={[<IoIosSend /> ]}
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="">
                            <span className="label-text">Note</span>
                            <input type="text" name="note" onChange={handleChange} value={state.modalData.note} className="input input-secondary w-full" placeholder="Masukan Note" />
                        </label>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default JadwalHome