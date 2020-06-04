import React, { useState, useEffect } from 'react';
import { Button, Table } from '@alifd/next';
import { store as pageStore } from 'ice/TableTest'

const Guide = () => {
  // const [dataSource, setDataSource] = useState(result);
  const [dataSource, setDataDispatch] = pageStore.useModel('default');
  const onAdd = () => {
    const item = {
      title: { name: 'Quotation for 1PCS Nano controller compatible' },
      id: Date.now(),
      time: 2000
    };
    setDataDispatch.add(item);
  }

  const onRemove = (index) => {
    setDataDispatch.remove(index);
  }

  const renderOper = (value, index) => {
    return <a onClick={() => onRemove(index)}
      style={{ color: '#DC143C' }}> 删除 </a>;
  };
  return (<div>
    <p><Button onClick={onAdd}>Add Item</Button></p>
    <Table dataSource={dataSource} primaryKey="id">
      <Table.Column title="Id" dataIndex="id" />
      <Table.Column title="Title" dataIndex="title.name" />
      <Table.Column title="Time" dataIndex="time" />
      <Table.Column cell={renderOper} width="20%" />
    </Table>
  </div>);
};

export default Guide;