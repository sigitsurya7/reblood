import { NavLink } from "react-router-dom"

const CreateHome = () => {

    return(
        <>
            <div className='flex justify-center items-center h-3/4'>
                <div className='grid grid-cols-1 w-max gap-4'>
                    <NavLink to={'/create/permintaan'} className='btn btn-primary'>Permintaan Donor Darah</NavLink>
                    <NavLink to={'/create/donor_mandiri'} className='btn btn-primary'>Donor Darah Mandiri</NavLink>
                    <NavLink to={'/create/post_info'} className='btn btn-primary'>Post Info</NavLink>
                </div>
            </div>
        </>
    )
}

export default CreateHome