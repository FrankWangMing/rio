import {runServer} from "@rioe/server"
const runEditor  = ()=>{
    console.log("runEditor")

}


const run = ()=>{
    console.log("run")
    runEditor()
    runServer()
}
export {
    run
}