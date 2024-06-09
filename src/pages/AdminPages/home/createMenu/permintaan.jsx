import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Component
import { Card } from '../../../../component/card';
import { AddPermintaanDarah } from '../../../../config/middleware/services/master/create_permintaanDarah';
import { FaArrowLeft } from 'react-icons/fa6';
// JSON
import gol_darah from '../../../../config/middleware/services/json/gol_darah.json'
import data from "../../../../config/middleware/services/json/provinces.json"
// Select Library
import Select from "react-select";
import AsyncSelect from 'react-select/async';

const PermintaanDD = () => {
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
        selected: ''
    })

    const [family, setFamily] = useState({
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
    });
    const [personal, setPersonal] = useState({
        gol_darah: localStorage?.golDarah,
        sakit: '',
        tgl_target: '',
        jenis_kelamin: localStorage?.gender,
        phone: localStorage?.phone,
        lokasi: localStorage?.lokasi,
        tgl_lahir: '',
        qty_darah: '',
        image_name: '',
        image: null,
        image_prev: null,
    });

    const navigate = useNavigate()

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

        if (selected === 'Saya Sendiri') {
            updatePersonal({ [name]: modified });
        }else if(selected === 'Keluarga') {
            updateFamily(name, modified);
        }else{ 
            setState({
                ...state,
                [name]: modified
            })
        }
    }

    const updateFamily = (key, value) => {
        setFamily(prevState => ({
          ...prevState,
          [key]: value
        }));
    };

    const updatePersonal = (data) => {
        console.log(data); // set state to empty object
        setPersonal(data);
    };

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

    const handleOptionChange = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        });
    }

    const { selected } = state;
    
    useEffect(() => {
        setState({...state, selected: 'Saya Sendiri'});
    }, [localStorage]);

    console.log(personal,'personal')
    console.log(family,'family')
    
    return(
        <>
            <button type="button" className='btn btn-ghost mb-2' onClick={() => navigate(-1)}>
                <FaArrowLeft /> Kembali
            </button>
            <div className='h-max'>
                <Card title={'Permintaan Darah'} button={['simpan']} color={['primary']} click={[handleSubmit]}>
                    <form encType='multipart/form-data' className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Saya Sendiri</span> 
                                <input type="radio" name="selected" className="radio checked:bg-primary" value='Saya Sendiri' checked={selected === 'Saya Sendiri'} onChange={handleOptionChange}/>
                            </label>
                            </div>
                            <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Keluarga</span> 
                                <input type="radio" name="selected" className="radio checked:bg-secondary" value='Keluarga' checked={selected === 'Keluarga'} onChange={handleOptionChange}/>
                            </label>
                        </div>
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
                            <input type="number" name="phone" placeholder="Masukan no. handphone penerima" className="input input-secondary" onPaste={handlePaste} value={selected === 'Saya Sendiri' ? personal.phone : family.phone} onChange={handleInputChange} />
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
            
        </>
    )
}

export default PermintaanDD