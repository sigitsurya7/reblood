import Swal from "sweetalert2"
import { post } from "../../hooks/gateway"
import { handleResponse } from "./helper_service"
import axios from "axios"

export const AddPermintaanDarah = async ( form, handleResult ) => {
    try{
        console.log(form)
        const formdata = new FormData()
        formdata.append('gol_darah', form.gol_darah)
        formdata.append('sakit', form.sakit)
        formdata.append('tgl_target', form.tgl_target)
        formdata.append('gender', form.jenis_kelamin)
        formdata.append('phone', form.phone)
        formdata.append('lokasi', form.lokasi)
        formdata.append('tgl_lahir', form.tgl_lahir)
        formdata.append('qty_darah', form.qty_darah)
        formdata.append('image_name', form.image_name)
        formdata.append('image', form.image)
        
        const response = await post('admin/reqdarah', formdata)

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

export const createReqJadwal = (payload, onSuccess, onError) => {
    const response = axios.post(`v1/admin/reqjadwal`, payload);
    return handleResponse(response, onSuccess, onError);
};
