import { Link } from "react-router-dom"

const NotFound = () => {
    return(
        <>
            <div className="w-screen h-screen bg-base-200 flex justify-center items-center">
                <div className="flex flex-col gap-8 items-center">
                    <span className="text-5xl capitalize cursor-not-allowed font-mono underline underline-offset-4">404 Not Found</span>

                    <Link to={'/'} className="btn btn-ghost w-max">Back To HomePage</Link>
                </div>
            </div>
        </>
    )
}

export default NotFound