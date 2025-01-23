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
import { Outlet, useNavigate } from 'react-router';
import { Button } from 'antd';
export default observer((props) => {
  const nav = useNavigate();
  return (
    <>
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
        <Outlet></Outlet>
      </Editor>
      <Button
        onClick={() => {
          nav('test1');
        }}
      >
        12
      </Button>
    </>
  );
});
