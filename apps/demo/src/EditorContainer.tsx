import {Editor, Element, Frame, useEditor, useGenerate} from "@rio/core";
import {Text} from "./components/selectors";
import {Custom1, OnlyButtons} from "./components/selectors/Custom1";
import {Custom2, Custom2VideoDrop} from "./components/selectors/Custom2";
import {Custom3, Custom3BtnDrop} from "./components/selectors/Custom3";
import {Button} from "./components/selectors/Button";
import {Video} from "./components/selectors/Video";
import {RenderNode, Viewport} from "./components/editor";
import {Container} from './components/selectors/Container'
export default  () => {
    const editor = useEditor()
    const json = localStorage.getItem("editor")
    editor.actions.deserialize(JSON.parse(json))

  return   <Viewport>
          <Frame>

          </Frame>
      </Viewport>
}
