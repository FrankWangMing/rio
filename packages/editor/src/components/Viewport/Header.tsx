import { useEditor } from '@rioe/core';
import cx from 'classnames';
import { styled } from 'styled-components';
import { ReactSVG } from 'react-svg';
import { Button, Tooltip } from 'antd';
import generateCode from '../../data/api/generateCode';
import development from '../../data/api/development';
import PagesSelect from './PacesSelect';

const HeaderDiv = styled.div`
  width: 100%;
  height: 45px;
  z-index: 99999;
  position: relative;
  padding: 0px 10px;
  background: #d4d4d4;
  display: flex;
`;

const Btn = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  svg {
    margin-right: 6px;
    width: 12px;
    height: 12px;
    fill: #fff;
    opacity: 0.9;
  }
`;

const Item = styled.a<{ disabled?: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: #707070;
  }
  ${(props) =>
    props.disabled &&
    `
    opacity:0.5;
    cursor: not-allowed;
  `}
`;

export const Header = () => {
  const { enabled, canUndo, canRedo, actions, parseReactElement } =
    useEditor((state, query) => ({
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
      parseReactElement: query.parseReactElement,
      state: state,
    }));
  const { query } = useEditor();

  const Generate = () => {
    const data = query.serialize();
    generateCode(data);
  };
  const Development = () => {
    const data = query.serialize();
    development(data);
  };

  return (
    <HeaderDiv className="header text-white transition w-full">
      <div className="items-center flex w-full px-4 justify-end">
        {enabled && (
          <div className="flex-1 flex">
            <PagesSelect />
            <Tooltip title="Undo" placement="bottom">
              <Item
                disabled={!canUndo}
                onClick={() => actions.history.undo()}
              >
                <ReactSVG src="/icons/toolbox/undo.svg" />
              </Item>
            </Tooltip>
            <Tooltip title="Redo" placement="bottom">
              <Item
                disabled={!canRedo}
                onClick={() => actions.history.redo()}
              >
                <ReactSVG src="/icons/toolbox/redo.svg" />
              </Item>
            </Tooltip>
          </div>
        )}
        <div className="flex">
          <Btn
            className={cx([
              'transition cursor-pointer',
              {
                'bg-green-400': enabled,
                'bg-primary': !enabled,
              },
            ])}
            onClick={() => {
              actions.setOptions(
                (options) => (options.enabled = !enabled)
              );
            }}
          >
            {/* {enabled ? <Checkmark /> : <Customize />} */}
            {enabled ? 'Finish Editing' : 'Edit'}
          </Btn>
          <Button onClick={Generate}>Generate</Button>
          <Button onClick={Development}>预览</Button>
        </div>
      </div>
    </HeaderDiv>
  );
};
