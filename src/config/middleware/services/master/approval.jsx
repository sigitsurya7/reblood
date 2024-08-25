import Swal from "sweetalert2"
import { post } from "../../hooks/gateway"

export const Approval = async (payload, handleResult ) => {
    try{
        const response = await post('admin/approval/approve', payload)
        if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'Pengiriman Jadwal',
                text: 'Jadwal berhasil di kirim',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                handleResult('success')
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Pengiriman Jadwal',
                text: 'Jadwal gagal di kirim',
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

export const Reject = async (payload, handleResult ) => {
    try{
        const response = await post('admin/approval/return', payload)
        if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'Pembatalan Jadwal',
                text: 'Jadwal berhasil di batalakan',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                handleResult('success')
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Pembatalan Jadwal',
                text: 'Jadwal gagal di batalakan',
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