import { useState } from "react"
import { handleLogin } from "../../config/middleware/services/auth/auth"
import { MdBloodtype } from "react-icons/md";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { access_token } from "../../config/middleware/hooks/authConfig";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
    const [state, setState] = useState({
        phone: '',
        password: ''
    })

    const [ showPassword, setShowPassword ] = useState(false)

    function visiblePassword(){
        setShowPassword(!showPassword)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        let modified = value
        if(name == 'phone'){
            if(modified == '0'){
                modified = value.replace(/^0/, '62')
            }else if(modified == '8'){
                modified = value.replace(/^8/, '628')
            }else if(modified == '2') {
                modified = value.replace(/^2/, '622')
            }
        }
        setState({
            ...state,
            [name]: modified
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await handleLogin(state, (handleResult) => {
                window.location.reload()
            })
        } catch (error) {
            console.error(error)
        }
    }

    if((access_token())){
        return <Navigate to="/" />
    }

    return(
        <>
            <form className="flex flex-col gap-2">
                <div className="w-full">
                    <input type="text" name="phone" placeholder="No. Handphone" className="input input-secondary w-full" value={state.phone} onChange={handleInputChange} />
                </div>
                <div className="w-full">
                    <div className='relative'>
                        <input type={showPassword ? 'text' : 'password'} autoComplete='password' id='password' name='password' value={state.password} onChange={handleInputChange} className='input input-secondary w-full' placeholder='Password' />
                        <div className='absolute inset-y-0 right-0 pl-3 items-center flex p-4 cursor-pointer' onClick={visiblePassword} >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                </div>

                <Link to={'/auth/recovery'} className="text-right text-sm text-blue-400 underline underline-offset-2 cursor-pointer">lupa password ?</Link>

                <button onClick={handleSubmit} type="submit" className="btn btn-secondary w-full uppercase" >submit</button>
            </form>

            <div className="divider">Atau</div>

            <Link to={'/auth/daftar'} className="btn btn-primary w-full">Daftar</Link>
        </>
    )
}

export default Login