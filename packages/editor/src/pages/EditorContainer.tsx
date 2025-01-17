import { Frame, useEditor, Element } from '@rioe/core';
import { Container } from '@rioe/components';
import { Viewport } from '../components/editor';

export default () => {
  const editor = useEditor();
  const json = localStorage.getItem('editor');
  // editor.actions.deserialize(JSON.parse(json))

  console.log(editor);
  return (
    <Viewport>
      <Frame>
        <Element
          canvas
          is={Container}
          width="800px"
          height="auto"
          background={{ r: 255, g: 255, b: 255, a: 1 }}
          padding={['40', '40', '40', '40']}
          custom={{ displayName: 'App' }}
        ></Element>
      </Frame>
    </Viewport>
  );
};
