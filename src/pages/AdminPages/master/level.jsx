import { useEffect, useState } from "react"
import Table from "../../../component/table/table"
import { get } from "../../../config/middleware/hooks/gateway"
import Modal from "../../../component/modal/modal"
import { AddPengumuman, DeletePengumuman, EditPengumuman } from "../../../config/middleware/services/master/pengumumanServices"
import { BiPencil, BiTrash } from "react-icons/bi"
import Swal from "sweetalert2"

const Level = () => {

    const formPengumuman = {
        judul_pengumuman: '',
        isi_pengumuman: '',
        to_pengumuman: ''
    }

    const [ data, setData ] = useState([])
    const [ opsi, setOption ] = useState([])
    const [isModalOpen, setIsModalOpen] = useState({
        addPengumuman: false,
        editPengumuman: false
    })
    const [form, setForm] = useState(formPengumuman)

    function fetchData(page, itemPage) {
        let idPage = page ? page : 1
        let perpage = itemPage ? itemPage : 10
        get(`pengumuman?page=${idPage}&per_page=${perpage}`).then((response) => {
           setData(response.data)
        }).catch((error) => {
            console.error('Error fetching data:', error)
        });
    }
    
    function option() {
        get('role/option').then((response) => {
            setOption(response.data)
        }).catch((error) => {
            console.error('Error fetching options:', error);
        });
    }
    
    useEffect(() => {
        fetchData()
        option()
    }, [])

    const handleSubmit = async (e, status) => {
        e.preventDefault()
        if(status == 'add'){
            try {
                await AddPengumuman(form, (handleResult) => {
                    if(handleResult == 'success'){
                        fetchData()
                        setIsModalOpen({addPengumuman: false})
                    }else{
                        console.log('Error')
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }else{
            try {
                await EditPengumuman(form, (handleResult) => {
                    if(handleResult == 'success'){
                        fetchData()
                        setIsModalOpen({editPengumuman: false})
                    }else{
                        console.log('Error')
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }
    } 

    const handleDelete = async (id) => {
        try {
            await DeletePengumuman(id, (handleResult) => {
                if(handleResult == 'success'){
                    fetchData()
                    setIsModalOpen({addPengumuman: false})
                }else{
                    console.log('Error')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const openModal = () => {
        setForm(formPengumuman)
        setIsModalOpen({addPengumuman: true})
    }

    const closeModal = () => {
        setIsModalOpen({addPengumuman: false})
    }

    const renderTable = (item, index) => {
        const edit = () => {
            setIsModalOpen({editPengumuman: true})
            setForm(item)
        }

        const delet = () => {
            Swal.fire({
                icon:'warning',
                title:'Apakah Anda Yakin?',
                confirmButtonText:'Ya',
                showCancelButton:true,
                cancelButtonText:'Batal'
            }).then((isConfirm) => {
                if(isConfirm.isConfirmed){
                    handleDelete(item.id)
                }
            })
        }

        return (
            <>
                <td className="capitalize">{index + 1}</td>
                <td className="capitalize">{item.judul_pengumuman}</td>
                <td className="">{item.isi_pengumuman}</td>
                <td className="capitalize">{item.to_pengumuman.replace(/_/g, " ")}</td>
                <td className="capitalize">{item.pembuat}</td>
                <td>
                    <div className="flex flex-wrap gap-2">
                        <div className="btn btn-sm btn-warning" onClick={edit}>
                            <BiPencil />
                        </div>
                        <div className="btn btn-sm btn-error" onClick={delet}>
                            <BiTrash />
                        </div>
                    </div>
                </td>
            </>
        )
    }

    return(
        <>
            <Table
                tableName={'Pengumuman'}
                thead={['No', 'judul', 'isi', 'untuk', 'pembuat', 'action']}
                button={['tambah data']}
                funcButton={[openModal, ]}
                color={['primary']}
                data={data}
                fetch={fetchData}
            >
                {renderTable}
            </Table>

            <Modal
                title={isModalOpen.addPengumuman ? 'Tambah Pengumuman' : isModalOpen.editPengumuman ? 'Edit Pengumuman' : ''}
                isOpen={isModalOpen.addPengumuman ? isModalOpen.addPengumuman : isModalOpen.editPengumuman ? isModalOpen.editPengumuman : ''}
                onClose={closeModal}
                button={'simpan'}
                funcButton={(e) => handleSubmit(e, isModalOpen.addPengumuman ? 'add' : isModalOpen.editPengumuman ? 'edit' : '')}
            >
                <div className="flex flex-col gap-4 w-full">
                    <div className="grid grid-cols-2 gap-2 items-center">
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Nama Level</span>
                            </div>
                            <input type="text" placeholder="Nama Level" className="input input-primary" name="judul_pengumuman" value={form.judul_pengumuman} onChange={handleInputChange} />
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Code Level</span>
                            </div>
                            <input type="text" placeholder="Code Level" className="input input-primary" name="judul_pengumuman" value={form.judul_pengumuman} onChange={handleInputChange} />
                        </label>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Level