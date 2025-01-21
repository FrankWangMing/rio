import { makeAutoObservable } from "mobx"
import { Pages } from "./Page"

class Model {
    pages: Pages
    constructor(pages: Pages) {
        this.pages = pages
        makeAutoObservable(this)
    }
}

export const pages = new Pages()
export const model = new Model(pages)