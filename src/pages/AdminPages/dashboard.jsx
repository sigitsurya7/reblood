import {BiGroup, BiSpeaker, BiUser, BiUserCheck} from 'react-icons/bi'
import { Greeting } from '../../config/middleware/hooks/greeting'

const Dashboard = () => {
    var nama = localStorage.getItem('fullname')
    var greeting = Greeting()
    return(
        <>
            <span className='text-xl font-semibold capitalize'>{greeting} {nama}</span>
        </>
    )
}

export default Dashboard