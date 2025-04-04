import type { RouteRecordRaw } from 'vue-router';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
    order: -1,
    icon: 'lucide:layout-dashboard',
    title: $t('userActivity.role.userActivityguanli'),
  },
  name: 'UserActivity',
  path: '/userActivity',
  children: [
    {
      name: 'UserActivityList',
      path: '/UserActivityList',
      component: () => import('#/views/userActivity/List.vue'),
      meta: {
        icon: 'lucide:area-chart',
        title: $t('userActivity.role.userActivityliebiao'),
      },
    },
    {
      name: 'UserActivityAdd',
      path: '/UserActivityAdd',
      component: () => import('#/views/userActivity/Form.vue'),
      meta: {
        icon: 'ion:edit',
        title: $t('userActivity.role.userActivitytianjia'),
        ignoreKeepAlive: true,
      },
    },
    {
      name: 'UserActivityEdit',
      path: 'UserActivityEdit/:id',
      component: () => import('#/views/userActivity/Form.vue'),
      meta: {
        icon: 'ion:edit',
        title: $t('userActivity.role.userActivitybianji'),
        hideMenu: true,
        ignoreKeepAlive: true,
      },
    },
  ],
}];

export default routes;