import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
// import { useAuth } from 'ice';
import Guide from './components/Guide';

const { Cell } = ResponsiveGrid;

const TestAnalysis = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <Guide />
      </Cell>
    </ResponsiveGrid>
  );
};

TestAnalysis.pageConfig = {
  // 可选，配置准入权限，若不配置则代表所有角色都可以访问
  auth: ['admin'],
};

export default TestAnalysis;
