import Swal from "sweetalert2"
import { post } from "../../hooks/gateway"

export const Approval = async (payload, handleResult ) => {
    try{
        const response = await post('admin/approval/approve', payload)
        response.then(res => {
            if (res.status == 200 || res.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Save data success',
                    text: res.data.message
                }).then(() => {
                    handleResult('success')
                })
            }
        }).catch(({ response: { data } }) => {
            handlerFormError(data);
        })
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
        response.then(res => {
            if (res.status == 200 || res.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Save data success',
                    text: res.data.message
                }).then(() => {
                    handleResult('success')
                })
            }
        }).catch(({ response: { data } }) => {
            handlerFormError(data);
        })
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