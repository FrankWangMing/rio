import { SubscriberAndCallbacksFor } from '@rioe/utils';
import { createContext } from 'react';

import { LayerMethods } from './actions';

export type LayerStore = SubscriberAndCallbacksFor<
  typeof LayerMethods
>;
export type LayerManagerContextType = {
  store: LayerStore;
};

export const LayerManagerContext =
  createContext<LayerManagerContextType>(
    {} as LayerManagerContextType
  );
