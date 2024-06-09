import { FaPencil } from 'react-icons/fa6'
import ProfileImage from '../../../assets/profile/9904258.png'
import { NavLink } from 'react-router-dom'

const ProfilePage = () => {
    let nama = localStorage.getItem('fullname')
    let golDarah = localStorage.getItem('golDarah')
    return(
        <div className="grid grid-cols-1 gap-6 items-center">
            <div className='w-full flex justify-center'>
                <div className='w-max'>
                    <label className="btn btn-ghost btn-circle avatar w-24 h-24 bg-base-200">
                        <div className="w-24 rounded-full">
                            <img src={ProfileImage} />
                        </div>
                    </label>
                    <NavLink to={'/profile/edit'} className='btn btn-ghost btn-sm bottom-0 flex gap-1'>
                        <FaPencil /> Edit
                    </NavLink>
                </div>
            </div>

            <div className='flex justify-around'>
                <div className='flex flex-col items-center'>
                    <span className='font-semibold'>Nama</span>
                    <span className='text-xl text-secondary font-semibold'>{nama}</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='font-semibold'>Golongan Darah</span>
                    <span className='text-xl text-secondary font-semibold'>{golDarah}</span>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <kbd className="kbd kbd-lg text-center">Total Donor <br /> 90</kbd>
                <kbd className="kbd kbd-lg text-center">Rank / Reward <br /> 76 </kbd>
            </div>

            <div className='divider'></div>

            <span className='text-xl font-semibold'>Riwayat Donor</span>
            
            <div>
                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    <li>
                        <div className="timeline-start">20 Januari 2023</div>
                        <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="timeline-end timeline-box">Bekasi Timur</div>
                        <hr/>
                    </li>
                    <li>
                        <hr/>
                        <div className="timeline-start">1 Maret 2023</div>
                        <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="timeline-end timeline-box">Jakarta Timur</div>
                        <hr/>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProfilePage