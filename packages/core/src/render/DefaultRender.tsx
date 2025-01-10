import React, { createElement, useMemo } from 'react';

import { SimpleElement } from './SimpleElement';

import { NodeId } from '../interfaces';
import { NodeElement } from '../nodes/NodeElement';
import { useInternalNode } from '../nodes/useInternalNode';

export const DefaultRender = () => {
  const { type, props, nodes, hydrationTimestamp,node } = useInternalNode(
    (node) => ({
      type: node.data.type,
      props: node.data.props,
      nodes: node.data.nodes,
      hydrationTimestamp: node._hydrationTimestamp,
      node:node
    })
  );

  return useMemo(() => {
    let children = props.children;

    if (nodes && nodes.length > 0) {
      children = (
        <React.Fragment>
          {nodes.map((id: NodeId) => (
            <NodeElement id={id} key={id} />
          ))}
        </React.Fragment>
      );
    }
    console.log(typeof type)
    console.log("type",type)
    console.log("props", props)
    console.log("children", children)

    const render = createElement(type, props, children);

    if (typeof type == 'string') {
      return <SimpleElement render={render} />;
    }
    // console.log(render)
    // console.log(node)
    return render;
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [type, props, hydrationTimestamp, nodes]);
};
