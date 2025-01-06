import { Editor } from '@rio/core';
import { observer, useLocalObservable } from 'mobx-react-lite';
import React from'react';
import { Container } from '../components/selectors';
import { Custom1, OnlyButtons } from '../components/selectors/Custom1';
import { Custom2, Custom2VideoDrop } from '../components/selectors/Custom2';
import { Custom3, Custom3BtnDrop } from '../components/selectors/Custom3';
import { Button } from '../components/selectors/Button/index.tsx';
import { Video } from '../components/selectors/Video';
import { Text } from '../components/selectors/Text';
import { RenderNode } from '../components/editor/index.ts';
import EditorContainer from './EditorContainer.tsx';

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
        enabled={true}
        onRender={RenderNode}
>
<EditorContainer/>
</Editor>
});