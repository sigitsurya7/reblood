import {BiGroup, BiSpeaker, BiUser, BiUserCheck} from 'react-icons/bi'
import { Greeting } from '../../config/middleware/hooks/greeting'

const Dashboard = () => {
    var nama = localStorage.getItem('fullname')
    var greeting = Greeting()
    return(
        <>
            <span className='text-xl font-semibold capitalize'>{greeting} {nama}</span>

            <div className='grid grid-cols-1 lg:grid-cols-3 my-4'>

                <div className="card w-full bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title">Contoh Card</h2>
                        <p>Text!</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard