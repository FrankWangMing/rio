import { useEditorStore } from "../editor"
import { useEditor } from "../hooks"


// const state = useEditor((state)=>{
//     return state
// })
// console.log(state)



export const useGenerate = ()=>{
    const state = useEditor((state)=>{
        return state
    })
}
