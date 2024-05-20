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

export function formatDate(dateString) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
  
    const date = new Date(dateString);
  
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${dayName}, ${day} ${month} ${year}`;
  }