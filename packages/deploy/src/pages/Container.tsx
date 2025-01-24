import {Frame, useEditor} from "@rioe/core";
import React from "react";

export default  ({data}:{data:any}) => {
    const editor = useEditor()
    const json = localStorage.getItem("editor")
    editor.actions.deserialize(data)

  return <Frame></Frame>
}
