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
        nama_gol_darah: '',
        sakit: '',
        tgl_target: '',
        jenis_kelamin: '',
        nama_jenis_kelamin: '',
        phone: '',
        lokasi: '',
        nama_lokasi: '',
        tgl_lahir: '',
        qty_darah: '',
        image_name: '',
        image: null,
        image_prev: null,
        selected: ''
    })

    const [family, setFamily] = useState({
        gol_darah: '',
        nama_gol_darah: '',
        sakit: '',
        tgl_target: '',
        jenis_kelamin: '',
        nama_jenis_kelamin: '',
        phone: '',
        lokasi: '',
        nama_lokasi: '',
        tgl_lahir: '',
        qty_darah: '',
        image_name: '',
        image: null,
        image_prev: null,
    });
    const [personal, setPersonal] = useState({
        gol_darah: localStorage?.golDarah,
        nama_gol_darah: localStorage?.golDarah,
        sakit: '',
        tgl_target: '',
        jenis_kelamin: localStorage?.gender,
        nama_jenis_kelamin: localStorage?.gender === 'L' ? 'Laki-laki' : 'Perempuan',
        phone: localStorage?.phone,
        lokasi: localStorage?.lokasi,
        nama_lokasi: localStorage?.lokasi,
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
            updatePersonal(name, modified );
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

    const updatePersonal = (key, value) => { // set state to empty object
        setPersonal(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const onChangeSelectGender = (e) => {

        if (selected === 'Saya Sendiri') {
            updatePersonal('jenis_kelamin', e.value );
            updatePersonal('nama_jenis_kelamin', e.label );
        }else if(selected === 'Keluarga') {
            updateFamily('jenis_kelamin', e.value);
            updateFamily('nama_jenis_kelamin', e.label);
        }else{ 
            setState({
                ...state,
                [jenis_kelamin]: e.value,
                [nama_jenis_kelamin]: e.label
            })
        }
    }

    const onChangeSelectGolDar = (e) => {
        if (selected === 'Saya Sendiri') {
            updatePersonal('gol_darah', e.value );
            updatePersonal('nama_gol_darah', e.label );
        }else if(selected === 'Keluarga') {
            updateFamily('gol_darah', e.value);
            updateFamily('nama_gol_darah', e.label);
        }else{ 
            setState({
                ...state,
                [gol_darah]: e.value,
                [nama_gol_darah]: e.label
            })
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        if (selected === 'Saya Sendiri') {
            setPersonal({
                ...personal,
                image_name: file.name,
                image: file
            })
        }else if(selected === 'Keluarga') {
            setFamily({
                ...family,
                image_name: file.name,
                image: file
            })
        }else{ 
            setState({
                ...state,
                image_name: file.name,
                image: file
            })
        }

        reader.onload = (event) => {
            if (selected === 'Saya Sendiri') {
                setPersonal((prevState) => ({
                    ...prevState,
                    image_prev: event.target.result
                }))
            }else if(selected === 'Keluarga') {
                setFamily((prevState) => ({
                    ...prevState,
                    image_prev: event.target.result
                }))
            }else{ 
                setState((prevState) => ({
                    ...prevState,
                    image_prev: event.target.result
                }))
            }
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
        const newPayload = selected === 'Saya Sendiri' ? {...personal} : {...family};
        if(selected === ''){
            Swal.fire({
                icon: 'warning',
                title: 'Isi Data Penerima',
                text: "Data penerima belum diisi",
                timer: 3000,
                showConfirmButton: false
              })
              return;
        }
        e.preventDefault()
        try {
            await AddPermintaanDarah(newPayload, (handleResult) => {
                // if(handleResult == 'success'){
                //     navigate('/auth/login')
                // }
            });
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

    const handleOnChange = (e) => {
        if (selected === 'Saya Sendiri') {
            updatePersonal('lokasi', e.label );
            updatePersonal('nama_lokasi', e.label );
        }else if(selected === 'Keluarga') {
            updateFamily('lokasi', e.label);
            updateFamily('nama_lokasi', e.label);
        }else{ 
            setState({
                ...state,
                [lokasi]: e.label,
                [nama_lokasi]: e.label
            })
        }
        
    };

    const { selected } = state;
    
    useEffect(() => {
        setState({...state, selected: 'Saya Sendiri'});
        // setPersonal
    }, [localStorage]);
    
    return(
        <>
            <button type="button" className='btn btn-ghost mb-2' onClick={() => navigate(-1)}>
                <FaArrowLeft /> Kembali
            </button>
            <div className='h-max'>
                {/* {JSON.stringify(family)} */}
                {/* {JSON.stringify(selected)} */}
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
                                placeholder="Pilih Jenis Kelamin Penerima"
                                name="jenis_kelamin"
                                id="jenis_kelamin"
                                value={selected === 'Saya Sendiri' ? { value: personal?.jenis_kelamin, label: `${personal?.nama_jenis_kelamin}` } : { value: family?.jenis_kelamin, label: `${family?.nama_jenis_kelamin}` }}
                                options={jenis_kelamin}
                                onChange={(e) => onChangeSelectGender(e)}
                            />
                        </label>
                        
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Tanggal Lahir Penerima</span>
                            </div>
                            <input type="date" name="tgl_lahir" placeholder="tgl_lahir" className="input input-secondary w-full" value={selected === 'Saya Sendiri' ? personal?.tgl_lahir : family?.tgl_lahir} onChange={handleInputChange} />
                        </label>
                        
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Golongan Darah</span>
                            </div>
                            <Select
                                placeholder="Pilih Jenis Kelamin Penerima"
                                name="gol_darah"
                                id="gol_darah"
                                value={selected === 'Saya Sendiri' ? { value: personal?.gol_darah, label: `${personal?.nama_gol_darah}` } : { value: family?.gol_darah, label: `${family?.nama_gol_darah}` }}
                                options={gol_darah}
                                onChange={(e) => onChangeSelectGolDar(e)}
                            />
                        </label>
                        
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Jumlah Kantong Darah</span>
                            </div>
                            <input type="number" name="qty_darah" placeholder="Jumlah yang di perlukan" className="input input-secondary" value={selected === 'Saya Sendiri' ? personal?.qty_darah : family?.qty_darah} onChange={handleInputChange} />
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
                            <input type="text" name="sakit" placeholder="Masukan sakit yang di derita" className="input input-secondary" value={selected === 'Saya Sendiri' ? personal?.sakit : family?.sakit} onChange={handleInputChange} />
                        </label>
                        
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Lokasi</span>
                            </div>
                            <AsyncSelect
                                cacheOptions
                                placeholder="Pilih Lokasi"
                                name="lokasi"
                                id="lokasi"
                                classNamePrefix={'custom-selectB2b'}
                                // value={itemLocal?.code_sub_category ? { value: itemLocal?.code_sub_category, label: ` ${itemLocal?.code_sub_category} - ${itemLocal?.desc_sub_category}` } : null}
                                value={selected === 'Saya Sendiri' ? { value: personal?.lokasi, label: `${personal?.nama_lokasi}` } : { value: family?.lokasi, label: `${family?.nama_lokasi}` }}
                                loadOptions={loadOptions}
                                defaultOptions
                                onChange={(e) => handleOnChange(e)}
                            />
                        </label>
                        
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Batas Penerimaan</span>
                            </div>
                            <input type="date" name="tgl_target" placeholder="tgl_target" className="input input-secondary w-full" value={selected === 'Saya Sendiri' ? personal?.tgl_target : family?.tgl_target} onChange={handleInputChange} />
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