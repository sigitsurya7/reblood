export const handleResponse = (response, onSuccess, onError = err => { }) => {
    if (onSuccess) {
        response.then(onSuccess).catch(onError);
    }
    return response;
}