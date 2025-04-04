import type { RouteRecordRaw } from 'vue-router';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
    order: -1,
    icon: 'lucide:layout-dashboard',
    title: $t('activity.role.activityguanli'),
  },
  name: 'Activity',
  path: '/activity',
  children: [
    {
      name: 'ActivityList',
      path: '/ActivityList',
      component: () => import('#/views/activity/List.vue'),
      meta: {
        icon: 'lucide:area-chart',
        title: $t('activity.role.activityliebiao'),
      },
    },
    {
      name: 'ActivityAdd',
      path: '/ActivityAdd',
      component: () => import('#/views/activity/Form.vue'),
      meta: {
        icon: 'ion:edit',
        title: $t('activity.role.activitytianjia'),
        ignoreKeepAlive: true,
      },
    },
    {
      name: 'ActivityEdit',
      path: 'ActivityEdit/:id',
      component: () => import('#/views/activity/Form.vue'),
      meta: {
        icon: 'ion:edit',
        title: $t('activity.role.activitybianji'),
        hideMenu: true,
        ignoreKeepAlive: true,
      },
    },
  ],
}];

export default routes;