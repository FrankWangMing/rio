import React from 'react';
import { LayerOptions } from '../interfaces';
type LayerManagerProviderProps = {
    options: Partial<LayerOptions>;
    children?: React.ReactNode;
};
export declare const LayerManagerProvider: ({ children, options, }: LayerManagerProviderProps) => JSX.Element;
export {};
