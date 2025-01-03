import { SubscriberAndCallbacksFor, PatchListener } from '@rio/utils';
import { QueryMethods } from './query';
import { EditorState, Options, NodeEventTypes, NodeId } from '../interfaces';
export declare const editorInitialState: EditorState;
export declare const ActionMethodsWithConfig: {
    methods: (state: EditorState, query: import("@rio/utils").QueryCallbacksFor<typeof QueryMethods>) => {
        setState(cb: (state: EditorState, actions: import("@rio/utils").Delete<import("@rio/utils").CallbacksFor<(state: EditorState, query: import("@rio/utils").QueryCallbacksFor<typeof QueryMethods>) => {
            addLinkedNodeFromTree(tree: import("../interfaces").NodeTree, parentId: NodeId, id: string): void;
            add(nodeToAdd: import("../interfaces").Node | import("../interfaces").Node[], parentId?: NodeId, index?: number): void;
            addNodeTree(tree: import("../interfaces").NodeTree, parentId?: NodeId, index?: number): void;
            delete(selector: import("../interfaces").NodeSelector<import("../interfaces").NodeSelectorType.Id>): void;
            deserialize(input: import("../interfaces").SerializedNodes | string): void;
            move(selector: import("../interfaces").NodeSelector, newParentId: NodeId, index: number): void;
            replaceNodes(nodes: import("../interfaces").Nodes): void;
            clearEvents(): void;
            reset(): void;
            setOptions(cb: (options: Partial<Options>) => void): void;
            setNodeEvent(eventType: NodeEventTypes, nodeIdSelector: import("../interfaces").NodeSelector<import("../interfaces").NodeSelectorType.Id>): void;
            setCustom<T extends NodeId>(selector: import("../interfaces").NodeSelector<import("../interfaces").NodeSelectorType.Id>, cb: (data: EditorState["nodes"][T]["data"]["custom"]) => void): void;
            setDOM(id: NodeId, dom: HTMLElement): void;
            setIndicator(indicator: import("../interfaces").Indicator | null): void;
            setHidden(id: NodeId, bool: boolean): void;
            setProp(selector: import("../interfaces").NodeSelector<import("../interfaces").NodeSelectorType.Id>, cb: (props: any) => void): void;
            selectNode(nodeIdSelector?: import("../interfaces").NodeSelector<import("../interfaces").NodeSelectorType.Id>): void;
        }>, "history">) => void): void;
        addLinkedNodeFromTree(tree: import("../interfaces").NodeTree, parentId: NodeId, id: string): void;
        add(nodeToAdd: import("../interfaces").Node | import("../interfaces").Node[], parentId?: NodeId, index?: number): void;
        addNodeTree(tree: import("../interfaces").NodeTree, parentId?: NodeId, index?: number): void;
        delete(selector: import("../interfaces").NodeSelector<import("../interfaces").NodeSelectorType.Id>): void;
        deserialize(input: import("../interfaces").SerializedNodes | string): void;
        move(selector: import("../interfaces").NodeSelector, newParentId: NodeId, index: number): void;
        replaceNodes(nodes: import("../interfaces").Nodes): void;
        clearEvents(): void;
        reset(): void;
        setOptions(cb: (options: Partial<Options>) => void): void;
        setNodeEvent(eventType: NodeEventTypes, nodeIdSelector: import("../interfaces").NodeSelector<import("../interfaces").NodeSelectorType.Id>): void;
        setCustom<T extends NodeId>(selector: import("../interfaces").NodeSelector<import("../interfaces").NodeSelectorType.Id>, cb: (data: EditorState["nodes"][T]["data"]["custom"]) => void): void;
        setDOM(id: NodeId, dom: HTMLElement): void;
        setIndicator(indicator: import("../interfaces").Indicator | null): void;
        setHidden(id: NodeId, bool: boolean): void;
        setProp(selector: import("../interfaces").NodeSelector<import("../interfaces").NodeSelectorType.Id>, cb: (props: any) => void): void;
        selectNode(nodeIdSelector?: import("../interfaces").NodeSelector<import("../interfaces").NodeSelectorType.Id>): void;
    };
    ignoreHistoryForActions: readonly ["setDOM", "setNodeEvent", "selectNode", "clearEvents", "setOptions", "setIndicator"];
    normalizeHistory: (state: EditorState) => void;
};
export type EditorStore = SubscriberAndCallbacksFor<typeof ActionMethodsWithConfig, typeof QueryMethods>;
export declare const useEditorStore: (options: Partial<Options>, patchListener: PatchListener<EditorState, typeof ActionMethodsWithConfig, typeof QueryMethods>) => EditorStore;
//# sourceMappingURL=store.d.ts.map