import { useState } from "react";
import AsyncSelect from 'react-select/async';
import Select from "react-select";
import data from "../../../config/middleware/services/json/provinces.json";
import gol_darah from "../../../config/middleware/services/json/gol_darah.json";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import ProfileImage from '../../../assets/profile/9904258.png'

const EditProfile = () => {

    const [ showPassword, setShowPassword ] = useState(false)

    function visiblePassword(){``
        setShowPassword(!showPassword)
    }

    const jenis_kelamin = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'}
    ]

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

    return(
        <form className="grid grid-cols-1 gap-4 bg-base-100 p-4 rounded-xl rounded-tr-[4rem] shadow-xl">
            <div className='w-full flex justify-center'>
                <div className='w-max'>
                    <label className="btn btn-ghost btn-circle avatar w-24 h-24 bg-base-200 shadow-xl">
                        <div className="w-24 rounded-full">
                            <img src={ProfileImage} />
                        </div>
                    </label>
                    <div>

                        <label htmlFor="edit" className="file file-input btn btn-ghost btn-sm bottom-0 flex gap-1">
                            <FaPencil /> Edit
                            <input id="edit" type="file" className='hidden' />
                        </label>
                    </div>
                </div>
            </div>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Nama</span>
                </div>
                <input type="text" name="nama" className="input input-secondary" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">No. Handphone</span>
                </div>
                <input type="number" name="telpon" className="input input-secondary" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Email</span>
                </div>
                <input type="email" name="email" className="input input-secondary" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Jenis Kelamin</span>
                </div>
                <Select
                    options={jenis_kelamin}
                    placeholder="Pilih Jenis Kelamin Penerima"
                    // onChange={(selectedOption) => handleInputChange({ target: { name: 'jenis_kelamin', value: selectedOption.value } })}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Lokasi</span>
                </div>
                <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOptions}
                    name="lokasi"
                    // value={state.lokasi}
                    placeholder="Pilih Lokasi"
                    classNamePrefix={'custom-selectB2b'}
                    // onChange={(selectedOption) => handleInputChange({ target: { name: 'lokasi', value: selectedOption } })}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Golongan Darah</span>
                </div>
                <Select
                    options={gol_darah}
                    placeholder="Pilih Golongan Darah"
                    // onChange={(selectedOption) => handleInputChange({ target: { name: 'gol_darah', value: selectedOption } })}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <div className='relative'>
                    <input type={showPassword ? 'text' : 'password'} autoComplete='password' id='password' name='password'  className='input input-secondary w-full' placeholder='Password' />
                    <div className='absolute inset-y-0 right-0 pl-3 items-center flex p-4 cursor-pointer' onClick={visiblePassword} >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
            </label>

            <button className="btn btn-primary">Simpan</button>
        </form>
    )
}

export default EditProfile