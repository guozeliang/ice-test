import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Pagination, Divider, Button, Box, Form, Select, Icon, Loading } from '@alifd/next';
// import { useRequest } from 'ice';
import { store } from 'ice/MemberListPage'
import styles from './index.module.scss';

const FormItem = Form.Item;

export interface IDataSource {
  tableData: object[];
  tableColumn: {};
};

interface ITableListProps {
  dataSource: IDataSource;
}

// 搜索条件数据
interface ISearchFormData {
  searchName: string;
  searchTitle: string;
}

const DEFAULT_SEARCH_DATA: ISearchFormData = {
  searchName: '',
  searchTitle: ''
};

const TableList: React.FunctionComponent<ITableListProps> = (): JSX.Element => {
  const [memberListState, memberListDispatchers] = store.useModel('memPageInfo');
  // const [memberListState, memberListDispatchers] = store.useModel('member');
  const [memNamesState, memNamesDispatchers] = store.useModel('memNames');
  const [titlesState, titlesDispatchers] = store.useModel('memTitle');

  const [loading, setLoading] = useState(true);
  const [delBtnState, setDelBtnState] = useState(true);
  const isMountedRef = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [currentPage, setCurPage] = useState(1);

  // 搜索数据
  const searchData: ISearchFormData = DEFAULT_SEARCH_DATA;

  useEffect(() => {
    isMountedRef.current = true;
    setTimeout(() => {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }, 1000);
    return () => isMountedRef.current = false;
  });

  // pageSize 显示条数  curPage 当前页数
  // useEffect(() => {
  //   memberListDispatchers.getMembers({ pageSize: 20, curPage: 1 });
  // }, [memberListDispatchers]);

  useEffect(() => {
    titlesDispatchers.getTitleDict();
  }, [titlesDispatchers]);

  const onOperation = (values) => {
    setLoading(true);
    console.log(`onOperation${values}`);
  };

  const onPaginationChange = (curPage) => {
    setLoading(true);
    // setCurPage(curPage);
    memberListDispatchers.getMembers({ pageSize: 20, curPage });
  };

  const selectedRowChange = (seledRowKeys: number[]) => {
    // 设置删除按钮 是否可用
    if (seledRowKeys.length > 0) {
      setDelBtnState(false);
    } else {
      setDelBtnState(true);
    }
    setSelectedRowKeys(seledRowKeys);
  }

  // 搜索用户名变化时调用
  const searchNameChange = (value: string) => {
    memNamesDispatchers.getMemberNames(value.trim());
    searchData.searchName = value;
  }

  // 搜索职位发生变化时
  const searchTitleChange = (value: string) => {
    searchData.searchTitle = value;
  }

  // 点击查询按钮时调用
  const searchBtnClick = () => {
    console.log(searchData.searchTitle);
    memberListDispatchers.searchMembers({ ...searchData, pageSize: 20, curPage: 1 });
  }

  // 删除员工信息
  const deleteOperation = () => {
    debugger;
    memberListDispatchers.remove(selectedRowKeys);
  }

  return (<>
    <Card free >
      <Card.Content>
        <Box padding={[8, 0, 0, 0]}>
          <Form inline>
            <FormItem colSpan={4} label="用户名:" labelAlign="left">
              <Select.AutoComplete name="searchUsername"
                filterLocal={false}
                placeholder="输入用户名"
                style={{ width: 180 }}
                onChange={searchNameChange}
                dataSource={memNamesState}
                innerAfter={<Icon type="search" size="xs" className={styles.searchIcon} />} />
            </FormItem>
            <FormItem colSpan={4} label="职位:" labelAlign="left" >
              <Select dataSource={titlesState} name="searchTitle"
                placeholder="选择职位" style={{ width: 180 }}
                onChange={searchTitleChange}
              />
            </FormItem>
            <FormItem colSpan={4} label=" " labelAlign="left"  >
              <Box spacing={10} direction="row" align="flex-end" justify='center' >
                <Button type="primary" onClick={searchBtnClick}>查询</Button>
                <Form.Reset >重置</Form.Reset>
                <Button type="primary" onClick={onOperation}>添加</Button>
                <Button type="normal" warning disabled={delBtnState} onClick={deleteOperation}>删除</Button>
              </Box>
            </FormItem>
          </Form>
        </Box>
        <Divider dashed style={{ height: '10px', marginBottom: '1px', marginTop: '0px' }} />
        <div className={styles.Main}>
          <Loading visible={loading} >
            <Table
              fixedHeader
              maxBodyHeight="60vh"
              hasBorder={false}
              className={styles.Table}
              dataSource={memberListState.members}
              primaryKey='userId'
              rowSelection={{
                onChange: selectedRowChange,
                columnProps: () => ({
                  lock: 'left'
                })
              }}
            >
              <Table.Column title="序号" width={90} dataIndex="order" key="order" />
              <Table.Column title="用户名" colSpan={3} dataIndex="name" key="name" />
              <Table.Column title="工作" colSpan={3} dataIndex="position" key="position" />
              <Table.Column title="职位" colSpan={3} dataIndex="title" key="title" />

              <Table.Column
                title="操作"
                colSpan={3}
                cell={() => (
                  <div className={styles.opt}>
                    <Button type="primary" text>编辑</Button>
                    <Divider direction="ver" />
                    <Button type="secondary" text className={styles.delbtn}>删除</Button>
                  </div>
                )}
              />
            </Table>
            <Box direction="row" align="center" justify="space-between" className={styles.BoxPagination}>
              <div className={styles.total}>
                共<span>{memberListState.totalRecords}</span>条需求
              </div>
              <Pagination type="normal" size="medium"
                total={memberListState.totalRecords}
                pageSize={memberListState.pageSize}
                onChange={onPaginationChange} />
            </Box>
          </Loading>
        </div>
      </Card.Content>
    </Card>
  </>);
};

export default TableList;
