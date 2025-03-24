import { RioConfig } from "./types"

export const loader = async (config:RioConfig)=>{
    console.log(config)

    return config
}