export function getName(){
    return localStorage.getItem('fullname')
}

export function getRole(){
    return localStorage.getItem('role_name')
}

export function access_token(){
    return localStorage.getItem('token')
}

// export const access_token = localStorage.getItem('token')
export const access_role = localStorage.getItem('role')