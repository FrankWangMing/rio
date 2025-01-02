import React from 'react';

import { DefaultRender } from './DefaultRender';

import { useInternalEditor } from '../editor/useInternalEditor';
import { useInternalNode } from '../nodes/useInternalNode';

type RenderNodeToElementProps = {
  render?: React.ReactElement;
  children?: React.ReactNode;
};
export const RenderNodeToElement = ({ render }: RenderNodeToElementProps) => {
  const { hidden } = useInternalNode((node) => ({
    hidden: node.data.hidden,
  }));

  const { onRender,state } = useInternalEditor((state) => ({
    onRender: state.options.onRender,
    state:state
  }));
  // don't display the node since it's hidden
  if (hidden) {
    return null;
  }
  return React.createElement(onRender, { render: render || <DefaultRender /> });
};
