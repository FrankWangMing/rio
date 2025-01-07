import {Frame, useEditor,Element} from "@rio/core";
import { Container } from "@rio/components";
import { Viewport } from "../components/editor";

export default  () => {
    const editor = useEditor()
    const json = localStorage.getItem("editor")
    editor.actions.deserialize(JSON.parse(json))

  return <Viewport>
            {/* <iframe src={"http://localhost:5173/"} width={"1920"} height={"1080"}>

            </iframe> */}
            <Frame>
                    <Element
                        canvas
                        is={Container}
                        width="800px"
                        height="auto"
                        background={{ r: 255, g: 255, b: 255, a: 1 }}
                        padding={['40', '40', '40', '40']}
                        custom={{ displayName: 'App' }}
                    ></Element>
                  </Frame>
        </Viewport>

}
