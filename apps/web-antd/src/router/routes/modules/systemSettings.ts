import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.systemSettings.title'),
    },
    name: 'SystemSetting',
    path: '/SystemSetting',
    children: [
      {
        name: 'SystemSettingList',
        path: '/SystemSettingList',
        component: () => import('#/views/systemSettings/List.vue'),
        meta: {
          // affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.systemSettings.systemSettingList'),
        },
      },
      {
        name: 'AddSetting',
        path: '/AddSetting',
        component: () => import('#/views/systemSettings/Form.vue'),
        meta: {
          // affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.systemSettings.addSetting'),
        },
      },
      {
        name: 'EditSetting',
        path: '/EditSetting',
        component: () => import('#/views/systemSettings/Form.vue'),
        meta: {
          // affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.systemSettings.editSetting'),
        },
      },
      {
        name: 'ChangeSetting',
        path: '/ChangeSetting',
        component: () => import('#/views/systemSettings/SystemSettingForm.vue'),
        meta: {
          // affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.systemSettings.changeSetting'),
        },
      }
    ],
  },
];

export default routes;
