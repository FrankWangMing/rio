import { Editor } from '@rioe/core';
import { observer, useLocalObservable } from 'mobx-react-lite';

import EditorContainer from './EditorContainer.tsx';
import { Container,Text,Custom1,Custom2,Custom3,Video,OnlyButtons,Custom3BtnDrop,Custom2VideoDrop } from '@rioe/components';
import { RenderNode } from '../components/editor/index.ts';

export default observer(() => {
const state = useLocalObservable(() => ({
count: 0,
setCount() {
    this.count++;
},
get double() {
    return this.count * 2;
}
}));
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
        enabled={false}
        onRender={RenderNode}>
<EditorContainer/>
</Editor>
});