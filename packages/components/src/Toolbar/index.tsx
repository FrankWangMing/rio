import { useEditor } from '@rioe/core';
import React from 'react';

export const Toolbar = () => {
  const { active, related } = useEditor((state, query) => {

    const currentlySelectedNodeId = query.getEvent('selected').first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <div className="py-1 h-full">
      {active && related.toolbar && React.createElement(related.toolbar)}
      {!active && (
        <div
          className="px-5 py-2 flex flex-col items-center h-full justify-center text-center"
          style={{
            color: 'rgba(0, 0, 0, 0.5607843137254902)',
            fontSize: '11px',
          }}
        >
          <h2 className="pb-1">Click on a component to start editing.</h2>
          <h2>
            You could also double click on the layers below to edit their names,
            like in Photoshop
          </h2>
        </div>
      )}
    </div>
  );
};


export * from './ToolbarItem';
export * from './ToolbarSection';
export * from './ToolbarTextInput';
export * from './ToolbarDropdown';
export * from './ToolbarRadio';
