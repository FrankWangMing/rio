import { Editor } from '@rio/core';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Container } from '../components/selectors';
import { Custom1, OnlyButtons } from '../components/selectors/Custom1';
import { Custom2, Custom2VideoDrop } from '../components/selectors/Custom2';
import { Custom3, Custom3BtnDrop } from '../components/selectors/Custom3';
import { Video } from '../components/selectors/Video';
import { Text } from '../components/selectors/Text';
import { RenderNode } from '../components/editor/index.ts';
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