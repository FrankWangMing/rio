import {Frame, useEditor,Element} from "@rio/core";
import { Container } from "../components/selectors";
import { Viewport } from "../components/editor";
import { data } from "./data";

export default  () => {
    const editor = useEditor()
    const json = localStorage.getItem("editor")
    editor.actions.deserialize(data)

  return <Frame></Frame>
}
