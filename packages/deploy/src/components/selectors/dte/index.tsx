
import { useEditor, useNode } from '@rio/core';

import Start from './Start';
import styled from 'styled-components';
import { DTEMapSettings } from './DTEMapSettings';



const DTEDiv = styled.div<{ $enabled: boolean }>`
  width: 100%;
  height: 100%;
  > div {
    height: 100%;
  }
  iframe {
    pointer-events: ${(props) => (props.$enabled ? 'none' : 'auto')};
    // width:100%!important;
    // height:100%!important;
  }
  .ant-select-selector {
      background: transparent !important;
      height: 28rem !important;
      line-height: 28rem !important;
      font-size: 14rem !important;
  }

  .ant-select-selection-item {
      color: rgba(218, 251, 255, 0.5);
      font-size: 14rem !important;
      height: 28rem !important;
      line-height: 28rem !important;
      padding-right: 4rem !important;
  }

  .ant-select-item-option-content {
      font-size: 14rem !important;
  }

  .ant-select-arrow {
      color: rgba(218, 251, 255, 0.5);
      right: 4rem !important;
      font-size: 14rem !important;
  }

  div {
      pointer-events: all;
  }

  .physics {
      position: absolute;
      top: 192rem;
      left: 20rem;
      background: #0e0f1168;
      width: 260rem;
      height: 68rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: SourceHanSansCN-Medium;
      font-size: 16rem;
      color: #ebf9ff;
      letter-spacing: 0.5px;
      font-weight: 500;
  }

  .animation {
      pointer-events: all;
      position: absolute;
      bottom: 20rem;
      left: 40rem;
      width: calc(100vw - 80rem);
      height: 80rem;
      padding: 0 40rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(14, 15, 17, 0.55);
  }

  .animation img {
      height: 100%;
  }

  .legend {
      color: #ebf9ff;
      position: absolute;
      bottom: 140rem;
      right: 20rem;
      text-align: center;
      background: rgba(14, 15, 17, 0.55);
      width: 80rem;
      font-size: 20rem;
      pointer-events: all;
  }

  .legend .color-list {
      display: flex;
      margin-top: 5px;
      justify-content: space-around;
      align-items: center;

  }

  .legend .color-list img {
      height: 300rem;
      width: 16rem;
  }

  .legend .color-list .numbers {
      overflow: hidden;
      text-combine-upright: all;
      font-size: 16rem;
  }

  .legend .color-list .numbers div {
      margin-top: 4.5rem;
  }

  .legend .act-legend-btn {
      background: rgba(48, 231, 245, 0.2);
      border: 1rem solid rgba(48, 231, 245, 1);
      margin-bottom: 10rem;
      cursor: pointer;
  }

  .legend-btn {
      background: rgba(0, 0, 0, 0.2);
      border: 1rem solid rgba(224, 253, 255, 1);
      margin-bottom: 10rem;
      cursor: pointer;
  }

  .legend-unit {
      font-size: 15rem;
      color: #ebf9ff;
  }

  /* html {
      font-size: 0.66875px;
  } */

  .box {
      display: flex;
      width: fit-content;
      height: fit-content;
      background: rgb(4 4 4 / 83%);
      position: absolute;
      padding: 4rem 10rem;
      font-size: 13px;
      color: #fff;
      flex-direction: column;
      align-items: center;

  }
`;

export const DTE = (props: any) => {
    const { enabled } = useEditor((state) => ({
      enabled: state.options.enabled,
    }));
    const {
      connectors: { connect },
    } = useNode((node) => ({
      selected: node.events.selected,
    }));

  return (
    <DTEDiv  $enabled={enabled} ref={connect} className="overflow-hidden">
        <Start/>
    </DTEDiv>
  );
};

DTE.craft = {
    displayName: 'DTE',
    props: {
        background: { r: 255, g: 255, b: 255, a: 0.5 },
        color: { r: 92, g: 90, b: 90, a: 1 },
        buttonStyle: 'full',
        text: 'Button',
        margin: ['5', '0', '5', '0'],
    },
    related: {
      toolbar: DTEMapSettings,
    },
};