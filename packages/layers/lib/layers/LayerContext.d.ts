import { NodeId } from '@rio/core';
import { EventHandlerConnectors } from '@rio/utils';
import React from 'react';
import { LayerHandlers } from '../events/LayerHandlers';
export type LayerContextType = {
    id: NodeId;
    depth: number;
    connectors: EventHandlerConnectors<LayerHandlers, React.ReactElement>;
};
export declare const LayerContext: React.Context<LayerContextType>;
