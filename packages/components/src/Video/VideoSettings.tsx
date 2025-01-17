import React from 'react';
import { ToolbarItem, ToolbarSection } from '../Toolbar';

export const VideoSettings = () => {
  return (
    <>
      <ToolbarSection title="Youtube">
        <ToolbarItem
          full={true}
          propKey="videoId"
          type="text"
          label="Video ID"
        />
      </ToolbarSection>
    </>
  );
};
