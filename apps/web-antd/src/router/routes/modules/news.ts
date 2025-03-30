import type { RouteRecordRaw } from 'vue-router';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
    order: -1,
    icon: 'lucide:layout-dashboard',
    title: $t('news.role.newsguanli'),
  },
  name: 'News',
  path: '/news',
  children: [
    {
      name: 'NewsList',
      path: '/NewsList',
      component: () => import('#/views/news/List.vue'),
      meta: {
        icon: 'lucide:area-chart',
        title: $t('news.role.newsliebiao'),
      },
    },
    {
      name: 'NewsAdd',
      path: '/NewsAdd',
      component: () => import('#/views/news/Form.vue'),
      meta: {
        icon: 'ion:edit',
        title: $t('news.role.newstianjia'),
        ignoreKeepAlive: true,
      },
    },
    {
      name: 'NewsEdit',
      path: 'NewsEdit/:id',
      component: () => import('#/views/news/Form.vue'),
      meta: {
        icon: 'ion:edit',
        title: $t('news.role.newsbianji'),
        hideMenu: true,
        ignoreKeepAlive: true,
      },
    },
  ],
}];

export default routes;