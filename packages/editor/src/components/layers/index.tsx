import { ROOT_NODE } from '@rioe/utils';
import React from 'react';

import { LayerOptions } from './interfaces';
import { LayerContextProvider } from './layers/LayerContextProvider';
import { LayerManagerProvider } from './manager/LayerManagerProvider';
export {
  useLayer,
  DefaultLayer,
  DefaultLayerHeader,
  EditableLayerName,
} from './layers';

type LayersProps = Partial<LayerOptions>;

export const Layers = ({ ...options }: LayersProps) => {
  return (
    <LayerManagerProvider options={options}>
      <LayerContextProvider id={ROOT_NODE} depth={0} />
    </LayerManagerProvider>
  );
};
