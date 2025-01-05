import { httpInstance } from "./httpInstance"

const  generate = async () =>{
    const data  = await httpInstance.post('/generate')
    console.log(data)
    return {
        code: 200,
        message: 'success'
    }
}

export {
    generate
}