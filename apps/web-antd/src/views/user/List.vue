<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Button, CheckboxGroup, Form, FormItem, Input, message, Radio, RadioGroup, Select, Switch, TabPane, Tabs, Textarea } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import {
  getList, postDel
} from './api';

const router = useRouter();

interface RowType {
  // productName: string;
  // releaseDate: string;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { fixed: 'left', field: 'id', title: 'Id', width: 50 },
    { field: 'addressTRC20', title: 'TRC20地址', },
    { field: 'avatar', title: '头像', },
    { field: 'eth', title: 'ETH余额', },
    { field: 'usdc', title: 'USDC余额', },
    { field: 'profit', title: '收益', },
    { field: 'createTime', title: '注册时间', sortable: true, formatter: 'formatDateTime', },
    { field: 'userStatus', title: '用户状态', },
    { field: 'accountPermissions', title: '账户授权状态', },

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
 * 删除
 * @param id Id
 */
const delUser = (id: number) => {
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
      <template #action="{ row }">
        <Button type="link" @click="router.push({ name: 'UserEdit', query: { id: row.id }, params: { id: row.id } })">
          编辑
        </Button>

        <Button type="link" @click="delUser(row.id)">
          删除
        </Button>
      </template>
    </Grid>
  </Page>
</template>
