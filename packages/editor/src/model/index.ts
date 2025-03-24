import { makeAutoObservable } from "mobx"
import { Pages } from "./Page"
import generateCode from "../data/api/generateCode"

class Model {
    pages: Pages
    constructor(pages: Pages) {
        this.pages = pages
        makeAutoObservable(this)
    }

    generate(){
       generateCode({
        pages:this.pages.json
       })
    }
}

export const pages = new Pages()
export const model = new Model(pages)