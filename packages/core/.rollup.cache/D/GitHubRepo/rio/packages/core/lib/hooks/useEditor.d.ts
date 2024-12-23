import { Overwrite, Delete, OverwriteFnReturnType } from '@rio/utils';
import { EditorCollector, useInternalEditorReturnType } from '../editor/useInternalEditor';
type PrivateActions = 'addLinkedNodeFromTree' | 'setNodeEvent' | 'setDOM' | 'replaceNodes' | 'reset';
export type WithoutPrivateActions<S = null> = Delete<useInternalEditorReturnType<S>['actions'], PrivateActions | 'history'> & {
    history: Overwrite<useInternalEditorReturnType<S>['actions']['history'], {
        ignore: OverwriteFnReturnType<useInternalEditorReturnType<S>['actions']['history']['ignore'], PrivateActions>;
        throttle: OverwriteFnReturnType<useInternalEditorReturnType<S>['actions']['history']['throttle'], PrivateActions>;
    }>;
};
export type useEditorReturnType<S = null> = Overwrite<useInternalEditorReturnType<S>, {
    actions: WithoutPrivateActions;
    query: Delete<useInternalEditorReturnType<S>['query'], 'deserialize'>;
}>;
/**
 * A Hook that that provides methods and information related to the entire editor state.
 * @param collector Collector function to consume values from the editor's state
 */
export declare function useEditor(): useEditorReturnType;
export declare function useEditor<S>(collect: EditorCollector<S>): useEditorReturnType<S>;
export {};
//# sourceMappingURL=useEditor.d.ts.map