import { useEffect, useState } from "react"
import { handleLogin, handleRegister } from "../../config/middleware/services/auth/auth"
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { access_token } from "../../config/middleware/hooks/authConfig";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import data from "../../config/middleware/services/json/provinces.json";
import gol_darah from '../../config/middleware/services/json/gol_darah.json'
import Select from "react-select";

const Register = () => {
    const [state, setState] = useState({
        fullName: '',
        telpon: '',
        email: '',
        lokasi: '',
        password: '',
        gol_darah: ''
    })

    const [ showPassword, setShowPassword ] = useState(false)

    const navigate = useNavigate()

    function visiblePassword(){``
        setShowPassword(!showPassword)
    }

    const loadOptions = (inputValue, callback) => {
        const filteredOptions = data.filter(option =>
            option.name.toLowerCase().includes(inputValue.toLowerCase())
        )

        const options = filteredOptions.map(option => ({
            value: option.id,
            label: option.name
        }))

        callback(options)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        let modified = value
        if(name == 'telpon'){
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
            await handleRegister(state, (handleResult) => {
                if(handleResult == 'success'){
                    navigate('/auth/login')
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handlePaste = (e) => {
        const { name, value } = e.target
        e.preventDefault()
        let pasteText = e.clipboardData.getData('text')
        
        if (pasteText.startsWith('0')) {
            pasteText = '62' + pasteText.substring(1)
        }
        pasteText = pasteText.replace('+62', '62')
        e.target.value = pasteText

        setState({
            ...state,
            [name]: pasteText
        })
    }

    if((access_token())){
        return <Navigate to="/" />
    }

    return(
        <>
            <form className="flex flex-col gap-2">
                <div className="w-full">
                    <input type="text" name="fullName" placeholder="Nama Lengkap" className="input input-secondary w-full" value={state.fullName} onChange={handleInputChange} />
                </div>
                <div className="w-full">
                    <input type="number" name="telpon" placeholder="No. Handphone" className="input input-secondary w-full" value={state.telpon} onPaste={handlePaste} onChange={handleInputChange} />
                </div>
                <div className="w-full">
                    <input type="text" name="email" placeholder="Email" className="input input-secondary w-full" value={state.email} onChange={handleInputChange} />
                </div>
                <div className="w-full">
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        loadOptions={loadOptions}
                        name="lokasi"
                        value={state.lokasi}
                        placeholder="Pilih Lokasi"
                        classNamePrefix={'custom-selectB2b'}
                        onChange={(selectedOption) => handleInputChange({ target: { name: 'lokasi', value: selectedOption } })}
                    />
                </div>
                <div className="w-full">
                    <Select
                        options={gol_darah}
                        placeholder="Pilih Golongan Darah"
                        onChange={(selectedOption) => handleInputChange({ target: { name: 'gol_darah', value: selectedOption } })}
                    />
                </div>
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

            <Link to={'/auth/login'} className="text-center text-sm text-blue-400 underline underline-offset-2 cursor-pointer">Punya Akun ?</Link>
        </>
    )
}

export default Register