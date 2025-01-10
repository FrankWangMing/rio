import {Frame, useEditor,Element} from "@rio/core";
import {Viewport} from "./components/editor";
import { Container } from "./components/selectors";
export default  () => {
    const editor = useEditor()
    const json = localStorage.getItem("editor")
    editor.actions.deserialize(JSON.parse(json))

  return <Viewport>
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
