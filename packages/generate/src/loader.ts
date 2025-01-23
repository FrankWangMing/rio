import { RioConfig } from "./types"

export const loader = async (config:RioConfig)=>{
    console.log(config)
    const { pages } = config
    const routes = pages.map(i=>i.route)
    return { pages,routes }
}