import type { RouteRecordRaw } from 'vue-router';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
    order: -90,
    icon: 'lucide:layout-dashboard',
    title: $t('user.role.userguanli'),
  },
  name: 'User',
  path: '/user',
  children: [
    {
      name: 'UserList',
      path: '/UserList',
      component: () => import('#/views/user/List.vue'),
      meta: {
        icon: 'lucide:area-chart',
        title: $t('user.role.userliebiao'),
      },
    },
    {
      name: 'UserAdd',
      path: '/UserAdd',
      component: () => import('#/views/user/Form.vue'),
      meta: {
        icon: 'ion:edit',
        title: $t('user.role.usertianjia'),
        ignoreKeepAlive: true,
      },
    },
    {
      name: 'UserEdit',
      path: 'UserEdit/:id',
      component: () => import('#/views/user/Form.vue'),
      meta: {
        hideInMenu:true,
        icon: 'ion:edit',
        title: $t('user.role.userbianji'),
        hideMenu: true,
        ignoreKeepAlive: true,
      },
    },
  ],
}];

export default routes;
