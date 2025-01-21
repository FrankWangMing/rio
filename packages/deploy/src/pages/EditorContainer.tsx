import {Frame, useEditor} from "@rioe/core";

export default  () => {
    const editor = useEditor()
    const json = localStorage.getItem("editor")
    editor.actions.deserialize({})

  return <Frame></Frame>
}
