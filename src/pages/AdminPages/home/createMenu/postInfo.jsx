import { FaArrowLeft } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { Card } from "../../../../component/card"

const PostInfo = () => {
    const navigate = useNavigate()
    return(
        <>
            <button type="button" className='btn btn-ghost mb-2' onClick={() => navigate(-1)}>
                <FaArrowLeft /> Kembali
            </button>

            <Card title={'Post Info'} button={['simpan']} color={['primary']}>
                <form action="" className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Label</span>
                        </div>
                        <input type="text" name="label" placeholder="label" className="input input-secondary w-full" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Tanggal</span>
                        </div>
                        <input type="date" name="tanggal" placeholder="tanggal" className="input input-secondary w-full" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Waktu</span>
                        </div>
                        <input type="time" name="tanggal" placeholder="tanggal" className="input input-secondary w-full" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Lokasi</span>
                        </div>
                        <input type="text" name="lokasi" placeholder="Lokasi" className="input input-secondary w-full" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Upload Gambar</span>
                        </div>
                        <input type="file" className="file-input file-input-bordered file-input-secondary w-full" />
                    </label>

                </form>
            </Card>
        </>
    )
}

export default PostInfo