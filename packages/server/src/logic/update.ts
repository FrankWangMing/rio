import { database } from "../database"



const update = ({data}:any) => {

    database.get("123").then((response:any) => {
        response.data = data
        console.log('Document inserted:', response);
    })
}
export { update }