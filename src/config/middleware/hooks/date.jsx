import { format, parseISO } from "date-fns"

export function formatDateAndTime(dateTimeString) {
    const parsedDate = parseISO(dateTimeString)
    const formattedDate = format(parsedDate, "EEEE, d MMMM yyyy")
    const formattedTime = format(parsedDate, "HH:mm")
    return { formattedDate, formattedTime }
}