import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter, store } from 'ice';
import { Nav } from '@alifd/next';
// import { asideMenuConfig } from '../../menuConfig';


const SubNav = Nav.SubNav;
const NavItem = Nav.Item;

export interface IMenuItem {
  name: string;
  path: string;
  icon?: string;
  children?: IMenuItem[];
}

function getNavMenuItems(menusData: []) {
  if (!menusData) {
    return [];
  }
  return menusData
    .filter(item => item.name && !item.hideInMenu)
    .map((item, index) => {
      return getSubMenuOrItem(item, index);
    });
}

function getSubMenuOrItem(item: IMenuItem, index: number) {
  if (item.children && item.children.some(child => child.name)) {
    const childrenItems = getNavMenuItems(item.children);
    if (childrenItems && childrenItems.length > 0) {
      const subNav = (
        <SubNav
          key={index}
          icon={item.icon}
          label={item.name}
        >
          {childrenItems}
        </SubNav>
      );

      return subNav;
    }
    return null;
  }
  const navItem = (
    <NavItem key={item.path} icon={item.icon}>
      <Link to={item.path} replace>
        {item.name}
      </Link>
    </NavItem>
  );

  return navItem;
}

const Navigation = (props, context) => {
  const { location } = props;
  const { pathname } = location;
  const { isCollapse } = context;
  const [meunusState, meunusDispatchers] = store.useModel('menus');

  useEffect(() => {
    meunusDispatchers.getMenuList('token');
    console.log('test');
  }, [meunusDispatchers]);
  return (
    <Nav
      type="normal"
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      embeddable
      activeDirection="right"
      openMode="single"
      iconOnly={isCollapse}
      hasArrow={false}
      mode={isCollapse ? 'popup' : 'inline'}
    >
      {getNavMenuItems(meunusState) }
    </Nav>
  );
};

Navigation.contextTypes = {
  isCollapse: PropTypes.bool,
};

const PageNav = withRouter(Navigation);

export default PageNav;
