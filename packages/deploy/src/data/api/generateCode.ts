import http from "../http"



export default (data) => {
    return http.post('/generate',{
        data,
    })
}




