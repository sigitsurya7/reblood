import axios from "axios"
import Swal from "sweetalert2"

const axiosInstance = () => {
    const token = localStorage.getItem('token')
    const instance = axios.create({
      baseURL: 'http://203.194.112.121:9569/v1/',
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
      }
    })
    instance.interceptors.response.use(
      response => response,
      error => {
        console.log(error.response.data.status);
        if (error.response && error.response.data.status === 440) {
          Swal.fire({
            icon: 'error',
            text: 'You Session Has Been Expired.',
            showConfirmButton: false,
            timer: 3000
          }).then(() => {
            // localStorage.clear();
            // window.location.href = "/auth/sesion-end"
          })
        }
        return Promise.reject(error)
      }
    )
  
    return instance
}

export const post = (endpoint, formdata) => {
    const url = `/${endpoint}`;
  
    return axiosInstance().post(url, formdata)
      .then(response => response.data)
      .catch(error => {
        throw new Error("POST request failed: " + error.message);
    });
}

export const get = (endpoint) => {
  const url = `/${endpoint}`
  return axiosInstance().get(url)
      .then(response => response.data)
      .catch(error => {
        throw new Error("GET request failed: " + error.message);
    });
}

export const del = (endpoint) => {
  const url = `/${endpoint}`
  return axiosInstance().delete(url)
      .then(response => response.data)
      .catch(error => {
        throw new Error("DEL request failed: " + error.message);
    });
}

export const put = (endpoint) => {
  const url = `/${endpoint}`
  return axiosInstance().putForm(url)
      .then(response => response.data)
      .catch(error => {
        throw new Error("PUT request failed: " + error.message);
    });
}