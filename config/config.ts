import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  base: '/dashboard/',
  publicPath: '/',
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              name: 'settings',
              path: '/settings',
              icon: 'setting',
              component: './Settings',
            },
            {
              name: 'ssl',
              path: '/ssl',
              icon: 'crown',
              routes: [
                {
                  path: '/ssl',
                  redirect: '/ssl/list',
                },
                {
                  path: '/ssl/list',
                  name: 'list',
                  component: './SSLModule/list',
                  hideInMenu: true,
                },
                {
                  path: '/ssl/:key/edit',
                  name: 'edit',
                  component: './SSLModule/detail',
                  hideInMenu: true,
                },
                {
                  path: '/ssl/create',
                  name: 'create',
                  component: './SSLModule/detail',
                  hideInMenu: true,
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ADMIN_API_SCHEMA: 'http',
    ADMIN_API_HOST: '127.0.0.1:9080',
    ADMIN_API_PATH: '/apisix/admin/',
    API_KEY: '',
  },
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
