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
            
        </>
    )
}

export default JadwalHome