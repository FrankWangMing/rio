import { Editor } from '@rio/core';
import { observer } from 'mobx-react-lite';
import { Container,Text,Custom1,Custom2,Custom3,Video,OnlyButtons,Custom3BtnDrop,Custom2VideoDrop } from '@rio/components';

import EditorContainer from './EditorContainer.tsx';
const Test = ()=>{
  return <div className="border-s-zinc-200 border border-opacity-100 border-solid">test123123</div>
}

export default observer(() => {

return  <Editor
        resolver={{
          Container,
          Text,
          // Button,
          Custom1,
          Custom2,
          Custom2VideoDrop,
          Custom3,
          Custom3BtnDrop,
          OnlyButtons,
          Video,
        }}
        enabled={false} >
  <EditorContainer/>
  <Test/>
</Editor>
});