import { commandArray } from './comdar'
import { RioServer } from './server'

if(commandArray[0]&& commandArray[0]=="rio"){
    const server = new RioServer()
    server.start()
}