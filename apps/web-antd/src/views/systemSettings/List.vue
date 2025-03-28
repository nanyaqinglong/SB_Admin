<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Button, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { getList } from './api';

const router = useRouter();

interface RowType {
  // productName: string;
  // releaseDate: string;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { fixed: 'left', title: 'Id', type: 'seq', width: 50 },
    { field: 'category.name', title: '分类' },
    { field: 'name', title: '名称' },
    { field: 'key', title: 'Key' },
    { field: 'dataContent', title: '内容' },
    { field: 'configJsonData', title: '配置Json' },
    { field: 'dataContentConfig', title: '数据配置类型' },
    {
      field: 'displayType',
      title: '显示类型',
      slots: { default: 'displayType' },
    },
    {
      field: 'cantDelete',
      title: '不可删除',
      slots: { default: 'cantDelete' },
    },
    { field: 'sort', title: '排序' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      width: 120,
    },
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

const [Grid] = useVbenVxeGrid({ gridOptions });
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #cantDelete="{ row }">
        <Tag v-if="row.cantDelete" color="#f50">是</Tag>
        <Tag v-if="!row.cantDelete" color="#87d068">否</Tag>
      </template>

      <template #displayType="{ row }">
        <Tag v-if="row.displayType == 0" color="#2db7f5">单行文本框</Tag>
        <Tag v-if="row.displayType == 1" color="#2db7f5">多行文本框</Tag>
        <Tag v-if="row.displayType == 2" color="#2db7f5">单选Radio</Tag>
        <Tag v-if="row.displayType == 3" color="#2db7f5">单选Select</Tag>
        <Tag v-if="row.displayType == 4" color="#2db7f5">多选Checkbox</Tag>
        <Tag v-if="row.displayType == 5" color="#2db7f5">滑动开关</Tag>
        <Tag v-if="row.displayType == 6" color="#2db7f5">文件上传</Tag>
      </template>

      <template #action="{ row }">
        <Button
          type="link"
          @click="router.push({ name: 'EditSetting', query: { id: row.id } })"
        >
          编辑
        </Button>
      </template>
    </Grid>
  </Page>
</template>
