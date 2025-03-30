import type { RouteRecordRaw } from 'vue-router';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
    order: -1,
    icon: 'lucide:layout-dashboard',
    title: $t('fundRecord.role.fundRecordguanli'),
  },
  name: 'FundRecord',
  path: '/fundRecord',
  children: [
    {
      name: 'FundRecordList',
      path: '/FundRecordList',
      component: () => import('#/views/fundRecord/List.vue'),
      meta: {
        icon: 'lucide:area-chart',
        title: $t('fundRecord.role.fundRecordliebiao'),
      },
    },
    {
      name: 'FundRecordAdd',
      path: '/FundRecordAdd',
      component: () => import('#/views/fundRecord/Form.vue'),
      meta: {
        icon: 'ion:edit',
        title: $t('fundRecord.role.fundRecordtianjia'),
        ignoreKeepAlive: true,
      },
    },
    {
      name: 'FundRecordEdit',
      path: 'FundRecordEdit/:id',
      component: () => import('#/views/fundRecord/Form.vue'),
      meta: {
        icon: 'ion:edit',
        title: $t('fundRecord.role.fundRecordbianji'),
        hideMenu: true,
        ignoreKeepAlive: true,
      },
    },
  ],
}];

export default routes;