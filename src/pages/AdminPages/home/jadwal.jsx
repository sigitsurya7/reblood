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

    const [flag,setFlag] = useState(0);
    
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const currentDate = today.getDate();

    const [ state, setState ] = useState({
        data: [],
        modal: false,
        modalData: {
            note: '',
            qty_darah_approve: 0,
            selectImage: null,
            previewImage: null
        },
        modalDetail: '',
        myPhone: localStorage.getItem('phone'),
        selectImage: null,
        previewImage: null
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

        if(name === 'qty_darah_approve'){
            if(value > state.modalData.sisa_qty_darah){
                Swal.fire({
                    icon: 'warning',
                    title: 'Gagal',
                    text: 'Jumlah Darah yang di approve tidak boleh lebih dari jumlah darah yang di perlukan',
                    timer: 3000,
                    showConfirmButton: false
                });
                return;
            }
        }

        setState((prevState) => ({
            ...prevState,
            modalData: {
                ...prevState.modalData,
                [name]: value
            }
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setState((prevState) => ({
                ...prevState,
                modalData: {
                    ...prevState.modalData,
                    selectImage: file
                }
            }))
            // setState({
            //     ...state,
            //     selectImage: file,
            // })

            const reader = new FileReader()
            reader.onloadend = () => {
                // setState({
                //     ...state,
                //     selectImage: file,
                //     previewImage: reader.result,
                // })
                setState((prevState) => ({
                    ...prevState,
                    modalData: {
                        ...prevState.modalData,
                        selectImage: file,
                        previewImage: reader.result,
                    }
                }))
                
            }
            reader.readAsDataURL(file)
        }
    }

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

        modalData.decision = state.modalDetail === 'approve' || state.modalDetail === 'upload' ? 1 : 2;

        try {
            if  (state.modalDetail === 'approve' || state.modalDetail === 'view') {
                await Approval(modalData, (handleResult) => {
                    setState({...state, modal:false, modalData: {}, modalDetail: '' })
                });
                setFlag(flag+1);
            }else if(state.modalDetail === 'upload'){
                const formdata = new FormData()

                formdata.append('image', modalData.selectImage)
                formdata.append('image_name', modalData.selectImage.name)
                formdata.append('note', modalData.note)
                formdata.append('id', modalData.id)
                formdata.append('phone', myPhone)
                formdata.append('qty_darah_approve', modalData.qty_darah_approve)
                formdata.append('qty_darah', modalData.qty_darah)
                formdata.append('decision', modalData.decision)
                formdata.append('is_schedulled', modalData.is_schedulled)
                formdata.append('phone_requestor', modalData.phone_requestor)
                formdata.append('nextapproval',myPhone)
                formdata.append('docnum', modalData.docnum)

                await Approval(formdata, (handleResult) => {
                    setState({...state, modal:false, modalData: {}, modalDetail: '' })
                });
                setFlag(flag+1);
            }else{
                await Reject(modalData, (handleResult) => {
                    setState({...state, modal:false, modalData: {}, modalDetail: '' })
                });
                setFlag(flag+1);
            }
        } catch (error) {
            console.error(error);
            setState({...state, modal:false, modalData: {}, modalDetail: '' })
        }
    }

    useState(() => {
        generateDates()
        getData()
    }, [flag])

    return(
        <>
            {/* <div className="carousel w-full gap-4 bg-base-200">
                {dates.map((value, index) => {
                    return(
                        <div key={index} className="carousel-item cursor-pointer shadow-md flex flex-col text-xl justify-center items-center bg-red-400 p-2 rounded-lg text-white font-semibold">
                            <span>{value.day}</span>
                            {value.month}
                        </div>
                    )
                })}
            </div> */}
            <div className="h-max w-full grid grid-cols-1 gap-4 my-4">
                {/* <span className="font-semibold">Jadwal Tanggal { currentDate } Bulan { getIndonesianMonthName(today.getMonth()) }</span> */}
                {
                    state.data.map((value, index) => {
                        return(
                            // value?.sisa_qty_darah > 0 &&
                            <div key={index}
                                className="bg-base-100 w-full p-4 rounded-lg rounded-tr-none shadow-md flex flex-col gap-2"
                            >
                                <div
                                    className="flex flex-col gap-2"
                                    // onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: value.is_schedulled == true && value.phone_requestor == state.myPhone ? 'upload' : 'view'})}}
                                >
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
                                </div>
                                <div className="divider"></div>
                                {value?.status == 3 ? 
                                    <span className="text-center text-red-500">Jadwal ini sudah di approve</span>
                                    :
                                    value.is_schedulled == false ?
                                    <div className="flex gap-4  justify-end min-w-fit">
                                        <button onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: 'reject'})}} className="btn btn-error">Reject</button>
                                        <button onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: 'approve'})}} className="btn btn-primary">Approve</button>
                                    </div>
                                    :
                                    <div className="flex gap-4  justify-end min-w-fit">
                                        <button onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: 'reject'})}} className="btn btn-error">Reject</button>
                                        <button onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: value.is_schedulled == true && value.phone_requestor == state.myPhone ? 'upload' : 'view'})}} className="btn btn-primary">Approve</button>
                                    </div>
                                }
                                {/* {
                                    value.is_schedulled == false ?
                                    <div className="flex gap-4  justify-end min-w-fit">
                                        <button onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: 'reject'})}} className="btn btn-error">Reject</button>
                                        <button onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: 'approve'})}} className="btn btn-primary">Approve</button>
                                    </div>
                                    :
                                    <div className="flex gap-4  justify-end min-w-fit">
                                        <button onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: 'reject'})}} className="btn btn-error">Reject</button>
                                        <button onClick={() => {setState({...state, modal: true, modalData: value, modalDetail: value.is_schedulled == true && value.phone_requestor == state.myPhone ? 'upload' : 'view'})}} className="btn btn-primary">Approve</button>
                                    </div>
                                } */}
                            </div>
                        )
                    })
                }
            </div>

            <Modal
                title={state.modalDetail}
                isOpen={state.modal}
                onClose={() => setState({...state, modal:false, modalData: {}, modalDetail: '' })}
                button={state.modalDetail === 'approve' ? ['Send'] : state.modalDetail === 'reject' ? ['Reject'] : state.modalDetail === 'upload' ? ['Upload'] : ['Finish'] }
                color={state.modalDetail === 'approve'? ['btn-primary'] : state.modalDetail === 'reject' ? ['btn-error'] : state.modalDetail === 'upload' ? ['btn-success'] : ['btn-success']}
                funcButton={[sendData]}
                icon={[<IoIosSend /> ]}
            >
                {
                    state.modalDetail == 'view' ?
                    <>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            <article className="flex flex-col gap-1 items-center">
                                <span className="underline underline-2 text-md font-semibold">Label</span>
                                <span className="font-semibold capitalize">{state.modalData.note}</span>
                            </article>
                            <article className="flex flex-col gap-1 items-center">
                                <span className="underline underline-2 text-md font-semibold">Tanggal</span>
                                <span className="font-semibold capitalize">{state.modalData.tgl_jadwal}</span>
                            </article>
                            <article className="flex flex-col gap-1 items-center">
                                <span className="underline underline-2 text-md font-semibold">Waktu</span>
                                <span className="font-semibold capitalize">{state.modalData.waktu}</span>
                            </article>
                            <article className="flex flex-col gap-1 items-center">
                                <span className="underline underline-2 text-md font-semibold">Lokasi</span>
                                <span className="font-semibold capitalize">{state.modalData.lokasi}</span>
                            </article>
                            
                            {/* <article className="flex flex-col gap-1 items-center">
                                <span className="underline underline-2 text-md font-semibold">Jumlah di perlukan</span>
                                <span className="font-semibold capitalize">{state.modalData.qty_darah}</span>
                            </article> */}
                            <article className="flex flex-col gap-1 items-center">
                                <span className="underline underline-2 text-md font-semibold">Jumlah di perlukan</span>
                                <span className="font-semibold capitalize">{state.modalData.sisa_qty_darah}</span>
                                {/* <span className="font-semibold capitalize">{state.modalData.total_qty}</span> */}
                            </article>
                            <article className="flex flex-col gap-1 items-center">
                                <span className="underline underline-2 text-md font-semibold">Jumlah di approve</span>
                                <span className="font-semibold capitalize">{state.modalData.qty_darah_approve}</span>
                            </article>
                        </div>
                        <div className="flex flex-col gap-4 mt-4">
                            <div>
                                <label htmlFor="">
                                    <span className="label-text">Note</span>
                                    <input type="text" name="note" onChange={handleChange} value={state.modalData.note} className="input input-secondary w-full" placeholder="Masukan Note" />
                                </label>
                            </div>
                        </div>
                    </>
                    : state.modalDetail == 'upload' ?
                        <>
                            <label className="form-control w-full mb-5">
                                <div className="label">
                                    <span className="label-text">Jumlah Kantong Darah</span>
                                </div>
                                <input type="number" name="qty_darah_approve" placeholder="Jumlah yang di donor" className="input input-secondary" value={state.modalData.qty_darah_approve} onChange={handleChange} />
                            </label>
                            <label for="uploadFile1"
                                class="bg-base-100 p-9 text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                                {state.modalData.previewImage ?
                                    <img 
                                        src={state.modalData.previewImage} 
                                        alt="Preview" 
                                        className="w-1/2 h-auto rounded-lg"
                                    />
                                :
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                                        <path
                                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                        data-original="#000000" />
                                        <path
                                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                        data-original="#000000" />
                                    </svg>
                                }
                                Upload file

                                <input type="file" onChange={handleImageChange} id='uploadFile1' class="hidden" />
                                <p class="text-xs font-medium text-gray-400 mt-2">Harap Upload Bukti Gambar.</p>
                            </label>
                            <div className="flex flex-col gap-4 mt-4">
                                <div>
                                    <label htmlFor="">
                                        <span className="label-text">Note</span>
                                        <input type="text" name="note" onChange={handleChange} value={state.modalData.note} className="input input-secondary w-full" placeholder="Masukan Note" />
                                    </label>
                                </div>
                            </div>
                        </>
                    :
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="">
                                <span className="label-text">Note</span>
                                <input type="text" name="note" onChange={handleChange} value={state.modalData.note} className="input input-secondary w-full" placeholder="Masukan Note" />
                            </label>
                        </div>
                    </div>
                }
            </Modal>
        </>
    )
}

export default JadwalHome