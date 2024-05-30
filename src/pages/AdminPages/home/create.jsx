import { useState } from 'react';
import gol_darah from '../../../config/middleware/services/json/gol_darah.json'
import data from "../../../config/middleware/services/json/provinces.json"
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import { Card } from '../../../component/card';
import { AddPermintaanDarah } from '../../../config/middleware/services/master/create_permintaanDarah';

const CreateHome = () => {

    const [state, setState] = useState({
        gol_darah: '',
        sakit: '',
        tgl_target: '',
        jenis_kelamin: '',
        phone: '',
        lokasi: '',
        tgl_lahir: '',
        qty_darah: '',
        image_name: '',
        image: null,
        image_prev: null,
    })

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

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        setState({
            ...state,
            image_name: file.name,
            image: file
        })

        reader.onload = (event) => {
            setState((prevState) => ({
                ...prevState,
                image_prev: event.target.result
            }))
        }
        reader.readAsDataURL(file)
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

    const jenis_kelamin = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'}
    ]

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(state)
        try {
            await AddPermintaanDarah(state, (handleResult) => {
                // if(handleResult == 'success'){
                //     navigate('/auth/login')
                // }
            })
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <>
            <div className='justify-center items-center h-1/2 hidden'>
                <div className='grid grid-cols-1 w-max gap-4'>
                    <button className='btn btn-primary'>Permintaan Donor Darah</button>
                    <button className='btn btn-primary'>Donor Darah Mandiri</button>
                    <button className='btn btn-primary'>Post Info</button>
                </div>
            </div>

            <div className=''>
                <div className='h-max'>
                    <Card title={'Permintaan Darah'} button={['simpan']} color={['primary']} click={[handleSubmit]}>
                        <form encType='multipart/form-data' className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
                            
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Jenis Kelamin</span>
                                </div>
                                <Select
                                    options={jenis_kelamin}
                                    placeholder="Pilih Jenis Kelamin Penerima"
                                    onChange={(selectedOption) => handleInputChange({ target: { name: 'jenis_kelamin', value: selectedOption.value } })}
                                />
                            </label>
                            
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Tanggal Lahir Penerima</span>
                                </div>
                                <input type="date" name="tgl_lahir" placeholder="tgl_lahir" className="input input-secondary w-full" value={state.tgl_lahir} onChange={handleInputChange} />
                            </label>
                            
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Golongan Darah</span>
                                </div>
                                <Select
                                    options={gol_darah}
                                    placeholder="Pilih Golongan Darah"
                                    onChange={(selectedOption) => handleInputChange({ target: { name: 'gol_darah', value: selectedOption.value } })}
                                />
                            </label>
                            
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Jumlah Kantong Darah</span>
                                </div>
                                <input type="number" name="qty_darah" placeholder="Jumlah yang di perlukan" className="input input-secondary" value={state.qty_darah} onChange={handleInputChange} />
                            </label>
                            
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">No. Handphone</span>
                                </div>
                                <input type="number" name="phone" placeholder="Masukan no. handphone penerima" className="input input-secondary" onPaste={handlePaste} value={state.phone} onChange={handleInputChange} />
                            </label>
                            
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Penyakit yang di derita</span>
                                </div>
                                <input type="text" name="sakit" placeholder="Masukan sakit yang di derita" className="input input-secondary" value={state.sakit} onChange={handleInputChange} />
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
                                    value={state.lokasi}
                                    placeholder="Pilih Lokasi"
                                    classNamePrefix={'custom-selectB2b'}
                                    onChange={(selectedOption) => handleInputChange({ target: { name: 'lokasi', value: selectedOption } })}
                                />
                            </label>
                            
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Batas Penerimaan</span>
                                </div>
                                <input type="date" name="tgl_target" placeholder="tgl_target" className="input input-secondary w-full" value={state.tgl_target} onChange={handleInputChange} />
                            </label>
                            <div className='flex justify-center gap-4'>
                                {state.image_prev ? <img src={state.image_prev} alt="" className='w-1/2 rounded-xl' /> : ''}
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Upload Gambar</span>
                                    </div>
                                    <input type="file" name='image' className="file-input file-input-bordered file-input-secondary w-full" onChange={handleFileChange} />
                                </label>
                            </div>


                        </form>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default CreateHome