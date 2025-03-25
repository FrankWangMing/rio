import { useEditor } from '@rioe/core';
import { Viewport } from '../components';

import { useDebounceFn } from 'ahooks';
import update from '../data/api/update';
import { pages } from '../model';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
export default observer(() => {
  const editor = useEditor();

  // editor.actions.deserialize(JSON.parse(json))

  const { run } = useDebounceFn(
    () => {
      update({
        data: editor.query.serialize(),
      });
    },
    {
      wait: 500,
    }
  );
  // pages.active?.update(JSON.parse(query.serialize()));
  editor.actions.setOptions((options) => {
    options.onNodesChange = (query) => {
      pages.active?.update(JSON.parse(query.serialize()));
    };
  });
  useEffect(() => {
    editor.actions.deserialize(pages.active?.view);
  }, [pages.update]);
  // editor.actions.on("add",(state)=>{
  //   console.log("jk")
  //   console.log({...state.events})
  // })

  return (
    <Viewport>
    </Viewport>
  );
});
