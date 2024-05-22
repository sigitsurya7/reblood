import { useState } from "react"
import { FaIdBadge, FaPhoneVolume } from "react-icons/fa6"

const JadwalHome = () => {
    const [dates, setDates] = useState([])
    
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const currentDate = today.getDate()

    const generateDates = () => {
        const datesArray = []
        for (let i = currentDate; i <= daysInMonth; i++) {
            const monthName = today.toLocaleDateString('en-US', { month: 'long' })
            datesArray.push({ day: i, month: monthName })
        }

        setDates(datesArray)
    }

    useState(() => {
        generateDates()
    }, [])

    return(
        <>
            <div className="carousel w-full gap-4">
                {dates.map((value, index) => {
                    return(
                        <div key={index} className="carousel-item shadow-md flex flex-col text-xl justify-center items-center bg-red-400 p-2 rounded-lg text-white font-semibold">
                        <span>{value.day}</span>
                        {value.month}
                        </div>
                    )
                })}
            </div>

            <div className="h-3/4 w-full bg-base-100 my-4 rounded-tr-[9rem] rounded-2xl shadow-md pt-9 pr-8 pl-3 grid-grid-cols-1 gap-2">
                <span className="font-semibold">Jadwal Tanggal ... Bulan ...</span>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        {/* <div className="w-10 rounded-full text-center"> */}
                            <FaIdBadge className="text-center " />
                        {/* </div> */}
                    </div>
                    <div className="chat-bubble">
                        Hari...
                        <br />
                        Jadwal...
                        <br />
                        Donor ... Golongan Darah ...
                        <br />
                        Untuk ...
                    </div>
                </div>
            </div>
        </>
    )
}

export default JadwalHome