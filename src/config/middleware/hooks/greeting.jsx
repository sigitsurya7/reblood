import { useEffect, useState } from "react"

export function Greeting() {
    const [greeting, setGreeting] = useState("Hello!")

    useEffect(() => {
        const currentTime = new Date()
        const currentHour = currentTime.getHours()

        if (currentHour >= 5 && currentHour < 12) {
        setGreeting("Selamat Pagi,")
        } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting("Selamat Siang,")
        } else {
        setGreeting("Selamat Malam,")
        }
    }, [])

    return greeting
}