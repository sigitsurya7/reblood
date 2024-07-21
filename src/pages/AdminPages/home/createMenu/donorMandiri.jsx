import { FaArrowLeft } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { Card } from "../../../../component/card"
import { useState } from "react"

const DonorMandiri = () => {

    const [ state, setState ] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target

        setState({
            ...state,
            [name] : value
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(state)
    }

    const navigate = useNavigate()
    return(
        <>
            <button type="button" className='btn btn-ghost mb-2' onClick={() => navigate(-1)}>
                <FaArrowLeft /> Kembali
            </button>

            <Card title={'Donor Mandiri'} button={['simpan']} color={['primary']} click={[handleSubmit]}>
                <form className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Label</span>
                        </div>
                        <input type="text" name="label" placeholder="label" value={state.label} onChange={handleChange} className="input input-secondary w-full" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Tanggal</span>
                        </div>
                        <input type="date" name="tanggal" placeholder="tanggal" value={state.tanggal} onChange={handleChange} className="input input-secondary w-full" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Lokasi</span>
                        </div>
                        <input type="text" name="lokasi" placeholder="Lokasi" value={state.lokasi} onChange={handleChange} className="input input-secondary w-full" />
                    </label>
                    {state.image_prev ? <img src={state.image_prev} alt="" className='w-1/2 rounded-xl shadow-lg' /> : ''}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Upload Gambar</span>
                        </div>
                        <input type="file" name="gambar" className="file-input file-input-bordered file-input-secondary w-full" onChange={handleFileChange} />
                    </label>

                </form>
            </Card>
        </>
    )
}

export default DonorMandiri