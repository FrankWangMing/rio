import { LayerContextType } from './LayerContext';
export type LayerContextProviderProps = Omit<LayerContextType, 'connectors'>;
export declare const LayerContextProvider: ({ id, depth, }: LayerContextProviderProps) => any;
