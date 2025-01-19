import { Editor } from '@rioe/core';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Text,
  Custom1,
  Custom2,
  Custom3,
  Video,
  OnlyButtons,
  Custom3BtnDrop,
  Custom2VideoDrop,
} from '@rioe/components';

import EditorContainer from './EditorContainer.tsx';

export default observer(() => {
  return (
    <Editor
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
    >
      <EditorContainer />
    </Editor>
  );
});
