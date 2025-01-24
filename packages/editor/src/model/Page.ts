import { makeAutoObservable } from "mobx"


const defaultPageView = {
    "ROOT": {
        "type": {
            "resolvedName": "Container"
        },
        "isCanvas": true,
        "props": {
            "flexDirection": "column",
            "alignItems": "flex-start",
            "justifyContent": "flex-start",
            "fillSpace": "no",
            "padding": [
                "40",
                "40",
                "40",
                "40"
            ],
            "margin": [
                "0",
                "0",
                "0",
                "0"
            ],
            "background": {
                "r": 255,
                "g": 255,
                "b": 255,
                "a": 1
            },
            "color": {
                "r": 0,
                "g": 0,
                "b": 0,
                "a": 1
            },
            "shadow": 0,
            "radius": 0,
            "width": "788px",
            "height": "530px"
        },
        "events": {},
        "displayName": "Container",
        "custom": {
            "displayName": "App"
        },
        "parent": null,
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
    }
}
type PageProps = {
    id?: string
    name: string
    path: string
}

export class Page {
    name: string
    path: string
    view: unknown = defaultPageView
    constructor(props: PageProps) {
        this.name = props.name
        this.path = props.path
    }

    update(view: unknown) {
        this.view = view
    }
    get json() {
        return {
            view: this.view
        }
    }
}




export class Pages {
    map: Map<string, Page> = new Map()
    active: Page | undefined
    update: number = Date.now()
    constructor() {
        makeAutoObservable(this)

        // console.log(getdata({}))
        this.createPage({
            name: "index",
            path: "index"
        })
        this.createPage({
            name: "index2",
            path: "index2"
        })
        this.active = this.map.get("index")
    }
    createPage(data: PageProps) {
        this.map.set(data.name, new Page(data))
    }
    deletePage(name: PageProps['name']) {
        this.map.delete(name)
    }
    setActivePage(name: string) {
        console.log(this.active)
        this.active = this.map.get(name)
        console.log(this.active)
        this.update = Date.now()
    }
    get json() {
        return Array.from(this.map.values()).map(i => {
            return {
                route: i.path,
                view: i.view
            }
        })
    }

}

