import { createApp } from 'ice';

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  // router: {
  //   modifyRoutes: (routes) => {
  //     history.push('/user/login');
  //     return routes;
  //   },
  // }
};


createApp(appConfig);
