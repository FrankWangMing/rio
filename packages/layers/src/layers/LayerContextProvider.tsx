import { useEditor } from '@rio/core';
import { wrapConnectorHooks } from '@rio/utils';
import React, { useMemo, useContext, useRef, useEffect } from 'react';

import { LayerContext, LayerContextType } from './LayerContext';
import { LayerNode } from './LayerNode';

import { useLayerEventHandler } from '../events/LayerEventContext';
import { LayerManagerContext } from '../manager';

export type LayerContextProviderProps = Omit<LayerContextType, 'connectors'>;

export const LayerContextProvider = ({
  id,
  depth,
}: LayerContextProviderProps) => {
  console.log('LayerContextProvider', { id, depth });
  const handlers = useLayerEventHandler();

  const { store } = useContext(LayerManagerContext);
  const storeRef = useRef(store);
  storeRef.current = store;

  const connectorsUsage = useMemo(() => handlers.createConnectorsUsage(), [
    handlers,
  ]);

  const connectors = useMemo(
    () => wrapConnectorHooks(connectorsUsage.connectors),
    [connectorsUsage]
  );

  useEffect(() => {
    connectorsUsage.register();

    return () => {
      connectorsUsage.cleanup();
    };
  }, [connectorsUsage]);

  const { exists } = useEditor((state) => ({
    exists: !!state.nodes[id],
  }));

  if (!exists) {
    return null;
  }

  return (
    <LayerContext.Provider value={{ id, depth, connectors }}>
      <LayerNode />
    </LayerContext.Provider>
  );
};
