import Swal from "sweetalert2"
import { del, post } from "../../hooks/gateway"

export const AddPengumuman = async ( form, handleResult ) => {
    try{
        const formdata = new FormData()
        formdata.append('judul_pengumuman', form.judul_pengumuman)
        formdata.append('isi_pengumuman', form.isi_pengumuman)
        formdata.append('to_pengumuman', form.to_pengumuman)
        
        const response = await post('pengumuman', formdata)

        console.log(response);

        if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'Pengumuman Berhasil di Update',
                text: 'Sukses Update Data',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                handleResult('success')
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Pengumuman Gagal di Update',
                text: 'Gagal Update Data',
                showConfirmButton: false,
                timer: 3000
            })
        }
    }catch(error){
        Swal.fire({
            icon: 'error',
            title: 'Ada kesalahan!',
            text: 'Gagal Update Data',
            showConfirmButton: false,
            timer: 3000
        })
    }
}

export const EditPengumuman = async ( form, handleResult ) => {
    try{
        const formdata = new FormData()
        formdata.append('judul_pengumuman', form.judul_pengumuman)
        formdata.append('isi_pengumuman', form.isi_pengumuman)
        formdata.append('to_pengumuman', form.to_pengumuman)
        
        const response = await post(`pengumuman/update/${form.id}`, formdata)

        if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'Pengumuman Berhasil di buat',
                text: 'Sukses Menambahkan Data',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                handleResult('success')
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Pengumuman Gagal di buat',
                text: 'Gagal Menambahkan Data',
                showConfirmButton: false,
                timer: 3000
            })
        }
    }catch(error){
        Swal.fire({
            icon: 'error',
            title: 'Ada kesalahan!',
            text: 'Gagal Menambahkan Data',
            showConfirmButton: false,
            timer: 3000
        })
    }
}

export const DeletePengumuman = async (id, handleResult) => {
    try {
        const response = await del(`pengumuman/${id}`)

        if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'Pengumuman Berhasil Hapus',
                text: 'Sukses Menghapus Data',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                handleResult('success')
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Pengumuman Gagal Hapus',
                text: 'Gagal Menghapus Data',
                showConfirmButton: false,
                timer: 3000
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Ada kesalahan!',
            text: 'Gagal Update Data',
            showConfirmButton: false,
            timer: 3000
        })
    }
}