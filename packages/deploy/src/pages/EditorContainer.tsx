import {Frame, useEditor} from "@rioe/core";
import { data } from "./data";

export default  () => {
    const editor = useEditor()
    const json = localStorage.getItem("editor")
    editor.actions.deserialize(data)

  return <Frame></Frame>
}
