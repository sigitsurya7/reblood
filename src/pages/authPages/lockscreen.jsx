import { useEffect, useState } from "react"
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { handleLogin } from "../../config/middleware/services/auth/auth";
import { Navigate } from "react-router-dom";

const LockScreen = () => {
    const [state, setState] = useState({
        phone: '',
        password: ''
    })

    const status_lock = localStorage.getItem('status_lock') == 0

    const [ showPassword, setShowPassword ] = useState(false)

    function visiblePassword(){
        setShowPassword(!showPassword)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }

    useEffect(() => {
        setState({
            ...state,
            ['phone']: localStorage.getItem('phone')
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await handleLogin(state, (handleResult) => {
                window.location.href = "/"
            })
        } catch (error) {
            console.error(error)
        }
    }

    if(status_lock){
        return <Navigate to="/" />
    }else{
        return(
            <form className="grid grid-cols-1 gap-4">
                <div className="w-full">
                    <div className='relative'>
                        <input type={showPassword ? 'text' : 'password'} autoComplete='password' id='password' name='password' value={state.password} onChange={handleInputChange} className='input input-secondary w-full' placeholder='Password' />
                        <div className='absolute inset-y-0 right-0 pl-3 items-center flex p-4 cursor-pointer' onClick={visiblePassword} >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                </div>
    
                <button onClick={handleSubmit} type="submit" className="btn btn-secondary w-full uppercase" >submit</button>
            </form>
        )
    }

}

export default LockScreen