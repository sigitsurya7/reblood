import { useState } from "react"
import { FaIdBadge, FaPhoneVolume } from "react-icons/fa6"
import { get } from "../../../config/middleware/hooks/gateway"
import { getIndonesianMonthName } from "../../../config/middleware/hooks/date"

const JadwalHome = () => {
    const [dates, setDates] = useState([])
    
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const currentDate = today.getDate()

    const [ state, setState ] = useState({
        data: []
    })

    const generateDates = () => {
        const datesArray = []
        for (let i = currentDate; i <= daysInMonth; i++) {
            const monthName = today.toLocaleDateString('en-US', { month: 'long' })
            datesArray.push({ day: i, month: monthName })
        }

        setDates(datesArray)
    }

    function getData(){
        get('admin/reqjadwal?filter=is_active:true').then((response) => {
            setState({
                ...state,
                data: response.data
            })
            
        })
    }

    useState(() => {
        generateDates()
        getData()
    }, [])

    return(
        <>
            <div className="carousel w-full gap-4 sticky bg-base-200 z-50 top-20">
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
                        console.log(value);
                        
                        return(
                            <>
                                <div className="bg-base-100 w-full p-4 rounded-lg rounded-tr-none shadow-md flex flex-col gap-2">
                                    <span className="font-mono text-center">{ value.docnum }</span>

                                    <article className="flex flex-col gap-1 text-center">
                                        <span className="underline underline-offset-1 font-semibold">Donor Berikutnya</span>
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
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default JadwalHome