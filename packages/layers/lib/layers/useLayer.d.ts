/// <reference types="react" />
import { Layer } from '../interfaces';
export declare function useLayer<S = null>(collect?: (layer: Layer) => S): {
    id: string;
    depth: number;
    children: string[];
    actions: {
        toggleLayer: () => void;
        setExpandedState: (expanded: boolean) => void;
    };
    connectors: import("@rio/utils").ChainableConnectors<{
        layer: (el: HTMLElement) => HTMLElement;
        drag: (el: HTMLElement) => HTMLElement;
        layerHeader: (el: HTMLElement) => HTMLElement;
    }, HTMLElement | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>>;
} & Omit<{
    store: import("../manager").LayerStore;
} & import("@rio/utils").ConditionallyMergeRecordTypes<S, {
    actions: {
        setDOM: (id: string, domCollection: Partial<Record<"dom" | "headingDom", HTMLElement>>) => void;
        setIndicator: (indicator: any) => void;
        setLayerEvent: (eventType: import("../interfaces").LayerEvents, id: string) => void;
        registerLayer: (id: string) => void;
        toggleLayer: (id: string) => void;
        setExpandedState: (id: string, expanded: boolean) => void;
    } & {
        history: {
            undo: () => void;
            redo: () => void;
            clear: () => void;
            throttle: (rate?: number) => import("@rio/utils").Delete<{
                setDOM: (id: string, domCollection: Partial<Record<"dom" | "headingDom", HTMLElement>>) => void;
                setIndicator: (indicator: any) => void;
                setLayerEvent: (eventType: import("../interfaces").LayerEvents, id: string) => void;
                registerLayer: (id: string) => void;
                toggleLayer: (id: string) => void;
                setExpandedState: (id: string, expanded: boolean) => void;
            }, never>;
            merge: () => import("@rio/utils").Delete<{
                setDOM: (id: string, domCollection: Partial<Record<"dom" | "headingDom", HTMLElement>>) => void;
                setIndicator: (indicator: any) => void;
                setLayerEvent: (eventType: import("../interfaces").LayerEvents, id: string) => void;
                registerLayer: (id: string) => void;
                toggleLayer: (id: string) => void;
                setExpandedState: (id: string, expanded: boolean) => void;
            }, never>;
            ignore: () => import("@rio/utils").Delete<{
                setDOM: (id: string, domCollection: Partial<Record<"dom" | "headingDom", HTMLElement>>) => void;
                setIndicator: (indicator: any) => void;
                setLayerEvent: (eventType: import("../interfaces").LayerEvents, id: string) => void;
                registerLayer: (id: string) => void;
                toggleLayer: (id: string) => void;
                setExpandedState: (id: string, expanded: boolean) => void;
            }, never>;
        };
    };
    query: {} | ({
        [x: string]: (...payload: any[]) => any;
    } & {
        history: {
            canUndo: () => boolean;
            canRedo: () => boolean;
        };
    });
}>, "actions">;
