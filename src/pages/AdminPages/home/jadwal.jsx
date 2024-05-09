import { useState } from "react"

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
            <div className="carousel carousel-center max-w-full p-4 space-x-4 rounded-box">
                {dates.map((date, index) => (
                    <div key={index} className={`max-content carousel-item ${currentDate == date.day ? 'bg-secondary' : 'bg-primary'} text-center rounded-full cursor-pointer hover:bg-primary-content hover:text-white`}>
                        <div className="-rotate-90 h-full pt-12 pb-12">
                            <span className="font-semibold text-nowrap text-2xl">{date.day} {date.month}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="my-8 w-full bg-base-300 p-4 h-3/4 rounded-lg">
                test
            </div>
        </>
    )
}

export default JadwalHome