import { useCollectorReturnType, QueryCallbacksFor, EventHandlerConnectors } from '@rio/utils';
import { QueryMethods } from './query';
import { EditorStore } from './store';
import { CoreEventHandlers } from '../events/CoreEventHandlers';
import { EditorState } from '../interfaces';
export type EditorCollector<C> = (state: EditorState, query: QueryCallbacksFor<typeof QueryMethods>) => C;
export type useInternalEditorReturnType<C = null> = useCollectorReturnType<EditorStore, C> & {
    inContext: boolean;
    store: EditorStore;
    connectors: EventHandlerConnectors<CoreEventHandlers, React.ReactElement>;
};
export declare function useInternalEditor<C>(collector?: EditorCollector<C>): useInternalEditorReturnType<C>;
//# sourceMappingURL=useInternalEditor.d.ts.map