import React, { useState } from 'react';
import { Shell, ConfigProvider } from '@alifd/next';
import umbrella from 'umbrella-storage';
import PageNav from './components/PageNav';
import HeaderAvatar from './components/HeaderAvatar';
import Logo from './components/Logo';

(function () {
  const throttle = function (type: string, name: string, obj: Window = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');
})();

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getDevice = (width: number) => {
    const isPhone =
      typeof navigator !== 'undefined' &&
      navigator &&
      navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    } else if (width < 1280 && width > 680) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };
  const storageUser = umbrella.getLocalStorage('user');
  const [device, setDevice] = useState(getDevice(NaN));
  window.addEventListener('optimizedResize', e => {
    setDevice(getDevice(e && e.target && e.target.innerWidth));
  });
  return (
    <ConfigProvider device={device}>
      <Shell
        type="brand"
        style={{
          height: '100vh',
          width:'100vw'
        }}
      >
        <Shell.Branding>
          <Logo
            image="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            text="Ice Admin"
          />
        </Shell.Branding>

        <Shell.Action>
          <HeaderAvatar {...storageUser} />
        </Shell.Action>
        <Shell.Navigation>
          <PageNav />
        </Shell.Navigation>
        <Shell.Content>
          {children}
        </Shell.Content>
      </Shell>
    </ConfigProvider>
  );
}
