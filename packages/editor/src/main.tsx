import { createRoot } from 'react-dom/client'
import './index.css'
import { Editor } from '@rio/core';
import { Custom1, OnlyButtons } from './components/selectors/Custom1/index.tsx';
import { Custom2, Custom2VideoDrop } from './components/selectors/Custom2/index.tsx';
import { Custom3, Custom3BtnDrop } from './components/selectors/Custom3/index.tsx';
import { Video } from './components/selectors/Video/index.tsx';
import { Text } from './components/selectors/Text/index.tsx';
import { BrowserRouter, Routes, Route } from "react-router";
import { Container } from './components/selectors/index.ts';
import { Button } from './components/selectors/Button/index.tsx';
import AppPreview from './AppPreview.tsx';
import EditorContainer from './EditorContainer.tsx';
import { RenderNode } from './components/editor/RenderNode.tsx';
import { DTE } from './components/selectors/dte/index.tsx';

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={
          <Editor
          resolver={{
            DTE,
            Container,
            Text,
            Custom1,
            Custom2,
            Custom2VideoDrop,
            Custom3,
            Custom3BtnDrop,
            OnlyButtons,
            Button,
            Video,
          }}
          enabled={true}
          onRender={RenderNode}
        >
        <EditorContainer/>
        </Editor>} />
      <Route path="/preview" element={
                  <Editor
                  resolver={{
                    DTE,
                    Container,
                    Text,
                    Custom1,
                    Custom2,
                    Custom2VideoDrop,
                    Custom3,
                    Custom3BtnDrop,
                    OnlyButtons,
                    Button,
                    Video,
                  }}
                  enabled={false}
                >
        <AppPreview />
        </Editor>
    } />
    </Routes>
  </BrowserRouter>


)
