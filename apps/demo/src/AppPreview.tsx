import { Frame, useEditor, useEditorStore } from "@rio/core"

export default ()=>{
    const editor = useEditor()
    editor.actions.setOptions((options) => {
        options.enabled = false
    });
    const json = localStorage.getItem("editor")
    editor.actions.deserialize(JSON.parse(json))
    console.log(editor.actions)
    editor.actions.clearEvents()

    return <div className={"w-full h-full bg-white flex flex-row justify-center"}>
         <Frame></Frame>
    </div>
}