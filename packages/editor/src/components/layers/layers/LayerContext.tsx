import { NodeId } from '@rioe/core';
import { EventHandlerConnectors } from '@rioe/utils';
import React from 'react';

import { LayerHandlers } from '../events/LayerHandlers';

export type LayerContextType = {
  id: NodeId;
  depth: number;
  connectors: EventHandlerConnectors<
    LayerHandlers,
    React.ReactElement
  >;
};

export const LayerContext = React.createContext<LayerContextType>(
  {} as LayerContextType
);
