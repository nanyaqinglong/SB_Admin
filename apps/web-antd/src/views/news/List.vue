<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Button, message, Switch } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { getList, postDel, postChangeShow } from './api';

const router = useRouter();

interface RowType {
  // productName: string;
  // releaseDate: string;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { fixed: 'left', title: 'Id', type: 'seq', width: 50 },
    { field: 'category.name', title: '新闻类型', width: 130, },
    { field: 'title', title: '新闻标题', width: 240, },
    { field: 'newsContent', title: '新闻内容', slots: { default: 'newsContent' }, width: 200, },
    { field: 'show', title: '显示', slots: { default: 'show' }, width: 100, },
    { field: 'sort', title: '排序', width: 100, },
    { field: 'createTime', title: '发布时间', width: 140, formatter: 'formatDateTime', },

    { field: 'action', fixed: 'right', slots: { default: 'action' }, title: '操作', width: 120, },
  ],
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        return await getList(page.currentPage, page.pageSize);
      },
    },
  },
  showOverflow: false,
  rowConfig: {
    isHover: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

/**
 * 修改显示状态
 * @param id 新闻Id
 */
const changeShow = (id: number) => {
  postChangeShow(id).then((result: any) => {
    if (result.code == 0) {
      gridApi.query();
    }
  });
}

/**
 * 删除新闻
 * @param id 新闻Id
 */
const delNews = (id: number) => {
  postDel(id).then((result: any) => {
    if (result.code == 0) {
      gridApi.query();
    }
  });
}

</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #newsContent="{ row }">
        <!-- <div v-html="row.newsContent" style="max-height: 100px;"></div> -->
      </template>

      <template #show="{ row }">
        <Switch @click="changeShow(row.id)" v-model:checked="row.show" checked-children="显示" un-checked-children="隐藏" />
      </template>

      <template #action="{ row }">
        <Button type="link" @click="router.push({ name: 'NewsEdit', query: { id: row.id }, params: { id: row.id } })">
          编辑
        </Button>
        <Button type="link" @click="delNews(row.id)">
          删除
        </Button>
      </template>
    </Grid>
  </Page>
</template>
