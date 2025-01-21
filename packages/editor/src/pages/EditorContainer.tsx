import { Frame, useEditor, Element } from '@rioe/core';
import { Container } from '@rioe/components';
import { Viewport } from '../components/editor';

import { useDebounceFn } from 'ahooks'
import update from '../data/api/update';
export default () => {
  const editor = useEditor();

  // editor.actions.deserialize(JSON.parse(json))

  const { run } =useDebounceFn(()=>{
    update({
      data:editor.query.serialize()
    })
  },{
    wait: 500,
  })
  editor.query.getOptions().onNodesChange = (query)=>{
    console.log(query)
    run()
  }
  // editor.actions.on("add",(state)=>{
  //   console.log("jk")
  //   console.log({...state.events})
  // })

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
