import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import type { InputRef } from 'antd';
import { pages } from '@rioe/editor/src/model';
import { observer } from 'mobx-react-lite';

let index = 0;

export default observer(() => {
  const [items, setItems] = useState(pages.map);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    pages.createPage({
      name,
      path: name,
    });
    setName(name);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      style={{ width: 300 }}
      placeholder="custom dropdown render"
      onChange={(value) => {
        console.log(value);
        pages.setActivePage(value);
      }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={addItem}
            >
              Add item
            </Button>
          </Space>
        </>
      )}
      options={Array.from(items.values()).map((item) => ({
        label: item.name,
        value: item.name,
      }))}
    />
  );
});
