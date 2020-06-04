import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import BasicList from './components/BasicList';

const { Cell } = ResponsiveGrid;

const MemberListPage = () => {
  return (
    <ResponsiveGrid gap={8}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: '列表页面' }, { name: '表格列表' }]}
        />
      </Cell>

      <Cell colSpan={12}>
        <BasicList />
      </Cell>
    </ResponsiveGrid>
  );
};

export default MemberListPage;
