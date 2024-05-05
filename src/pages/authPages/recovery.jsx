import { useState } from "react"
import { handleRecovery } from "../../config/middleware/services/auth/auth"
import { GiKoala } from "react-icons/gi";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { access_token } from "../../config/middleware/hooks/authConfig";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Recovery = () => {
    const [state, setState] = useState({
        username: '',
        password: '',
        code: ''
    })

    const [ showCode, setCode ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)

    const navigate = useNavigate()

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(state.code == showCode){
            try {
                await handleRecovery(state, (handleResult) => {
                    if(!showCode){
                        setCode(handleResult)
                    }else{
                        navigate('/auth/login')
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: "Nama Pengguna atau kata sandi salah",
                timer: 3000,
                showConfirmButton: false
            })
        }
    }

    if((access_token())){
        return <Navigate to="/" />
    }

    return(
        <>
            <form className="flex flex-col gap-1">
                <div className="w-full">
                    <input type="text" name="username" placeholder="Username" className={`input input-secondary w-full ${showCode ? 'hidden' : ''}`} value={state.username} onChange={handleInputChange} />
                </div>
                {showCode ? 
                    <>
                        <span className="text-center text-xl lowercase">{showCode}</span>

                        <input type="text" name="code" placeholder="Masukan Kode Di Atas" className={`input input-secondary w-full`} value={state.code} onChange={handleInputChange} />
                        <div className="w-full">
                            <div className='relative'>
                                <input type={showPassword ? 'text' : 'password'} autoComplete='password' id='password' name='password' value={state.password} onChange={handleInputChange} className='input input-secondary w-full' placeholder='Password' />
                                <div className='absolute inset-y-0 right-0 pl-3 items-center flex p-4 cursor-pointer' onClick={visiblePassword} >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                    </>
                : ''}

                <button onClick={handleSubmit} type="submit" className="btn btn-secondary w-full" >submit</button>
            </form>

            <Link to={'/auth/login'} className="text-center text-sm text-blue-400 underline underline-offset-2 cursor-pointer">Punya akun ?</Link>
        </>
    )
}

export default Recovery