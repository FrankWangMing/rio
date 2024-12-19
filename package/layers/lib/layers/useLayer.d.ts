import { Layer } from '../interfaces';
export declare function useLayer<S = null>(collect?: (layer: Layer) => S): {
    id: string;
    depth: number;
    children: string[];
    actions: {
        toggleLayer: () => void;
        setExpandedState: (expanded: boolean) => void;
    };
    connectors: import("@craftjs/utils").ChainableConnectors<{
        layer: (el: HTMLElement) => HTMLElement;
        drag: (el: HTMLElement) => HTMLElement;
        layerHeader: (el: HTMLElement) => HTMLElement;
    }, HTMLElement | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>>;
} & Omit<{
    store: import("../manager").LayerStore;
} & import("@craftjs/utils").ConditionallyMergeRecordTypes<S, {
    actions: {
        setLayerEvent: (eventType: import("../interfaces").LayerEvents, id: string) => void;
        registerLayer: (id: string) => void;
        setDOM: (id: string, domCollection: Partial<Record<"dom" | "headingDom", HTMLElement>>) => void;
        toggleLayer: (id: string) => void;
        setExpandedState: (id: string, expanded: boolean) => void;
        setIndicator: (indicator: any) => void;
    } & {
        history: {
            undo: () => void;
            redo: () => void;
            clear: () => void;
            throttle: (rate?: number) => import("@craftjs/utils").Delete<{
                setLayerEvent: (eventType: import("../interfaces").LayerEvents, id: string) => void;
                registerLayer: (id: string) => void;
                setDOM: (id: string, domCollection: Partial<Record<"dom" | "headingDom", HTMLElement>>) => void;
                toggleLayer: (id: string) => void;
                setExpandedState: (id: string, expanded: boolean) => void;
                setIndicator: (indicator: any) => void;
            }, never>;
            merge: () => import("@craftjs/utils").Delete<{
                setLayerEvent: (eventType: import("../interfaces").LayerEvents, id: string) => void;
                registerLayer: (id: string) => void;
                setDOM: (id: string, domCollection: Partial<Record<"dom" | "headingDom", HTMLElement>>) => void;
                toggleLayer: (id: string) => void;
                setExpandedState: (id: string, expanded: boolean) => void;
                setIndicator: (indicator: any) => void;
            }, never>;
            ignore: () => import("@craftjs/utils").Delete<{
                setLayerEvent: (eventType: import("../interfaces").LayerEvents, id: string) => void;
                registerLayer: (id: string) => void;
                setDOM: (id: string, domCollection: Partial<Record<"dom" | "headingDom", HTMLElement>>) => void;
                toggleLayer: (id: string) => void;
                setExpandedState: (id: string, expanded: boolean) => void;
                setIndicator: (indicator: any) => void;
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
