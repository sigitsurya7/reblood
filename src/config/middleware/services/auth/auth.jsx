import Swal from "sweetalert2"
import { post } from "../../hooks/gateway"

export const handleRegister = async ( login, handleResult ) => {
    try {
        const formdata = new FormData()
        formdata.append('phone', login.telpon)
        formdata.append('password', login.password)
        formdata.append('full_name', login.fullName)
        formdata.append('lokasi', login.lokasi.label)
        formdata.append('email', login.email)
        formdata.append('is_active', 'true')
        formdata.append('gol_darah', login.gol_darah.label)
    
        const response = await post('registration', formdata)
    
        if(response.status == '201'){
          Swal.fire({
            icon: 'success',
            title: 'Daftar Berhasil',
            text: "Berhasil mendaftarkan",
            timer: 3000,
            showConfirmButton: false
          }).then(() => {
            handleResult('success')
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Gagal Mendaftar',
            text: "Gagal Mendaftarkan",
            timer: 3000,
            showConfirmButton: false
          })
        }
    
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Mendaftar',
          text: "Gagal Mendaftarkan",
          timer: 3000,
          showConfirmButton: false
        })
      }
}

export const handleLogin = async ( login, handleResult ) => {
    try {
        const formdata = new FormData()
        formdata.append('phone', login.phone)
        formdata.append('password', login.password)
    
        const response = await post('login', formdata)
    
        if(response.is_active == true){

          const {access_token, email, fullname, gol_darah, image_name, lokasi, phone, refresh_token, role_id, role_name, userid} = response

          localStorage.setItem('token', access_token)
          localStorage.setItem('email', email)
          localStorage.setItem('fullname', fullname)
          localStorage.setItem('golDarah', gol_darah)
          localStorage.setItem('imageName', image_name)
          localStorage.setItem('lokasi', lokasi)
          localStorage.setItem('phone', phone)
          localStorage.setItem('refresh_token', refresh_token)
          localStorage.setItem('role_id', role_id)
          localStorage.setItem('role_name', role_name)
          localStorage.setItem('userid', userid)
          localStorage.setItem('status_lock', 0)
          // localStorage.setItem('theme', 'cupcake')

          Swal.fire({
            icon: 'success',
            title: 'Login Berhasil!',
            text: 'Login Berhasil, Anda akan di arahkan ke halaman utama',
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            handleResult(role_id)
          })
    
        }else{
          Swal.fire({
              icon: 'error',
              title: 'Login Gagal',
              text: 'Akun kamu nonaktif',
              showConfirmButton: false,
              timer: 3000
          })
        }
    
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: "Nama Pengguna atau kata sandi salah",
          timer: 3000,
          showConfirmButton: false
        })
      }
}

export const handleRecovery = async ( login, handleResult ) => {
    try {
        const formdata = new FormData()
        formdata.append('username', login.username)
        formdata.append('password', login.password)
    
        const response = await post('auth/recovery', formdata)
        if(login.code){
          Swal.fire({
            icon: 'success',
            title: 'Update Berhasil!',
            text: 'Password berhasil dirubah',
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            handleResult('ok')
          })
        }else{
          if(response.status){
            handleResult(response.data)
          }
        }
    
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: "Nama Pengguna atau kata sandi salah",
          timer: 3000,
          showConfirmButton: false
        })
      }
}

export const handleLogout = async (handleResult) => {
  try{
    Swal.fire({
        icon: 'success',
        title: 'Berhasil Keluar',
        text: 'Anda akan di arahkan ke halaman login',
        showConfirmButton: false,
        timer: 3000
    }).then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('fullname')
      localStorage.removeItem('golDarah')
      localStorage.removeItem('imageName')
      localStorage.removeItem('lokasi')
      localStorage.removeItem('phone')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('role_id')
      localStorage.removeItem('role_name')
      localStorage.removeItem('userid')
      localStorage.removeItem('status_lock')
        handleResult('success')
    })
  }catch(error){
    console.log(error);
  }
}

export const isLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
}