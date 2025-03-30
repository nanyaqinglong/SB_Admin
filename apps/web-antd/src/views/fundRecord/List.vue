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
    { fixed: 'left', title: 'Id', type: 'seq', width: 50 },
    { field: 'user.addressTRC20', title: '用户', },
    { field: 'userTarget.addressTRC20', title: '目标用户', },
    { field: 'changeQuantity', title: '变动数量', },
    { field: 'beforeChangeQuantity', title: '变动数量前', },
    { field: 'afterChangeQuantity', title: '变动数量后', },
    { field: 'busId1', title: '业务Id1', },
    { field: 'busId2', title: '业务Id2', },
    { field: 'busId3', title: '业务Id3', },
    { field: 'desc', title: '记录描述', },
    { field: 'remark', title: '记录描述', },
    { field: 'createTime', title: '记录时间', formatter: 'formatDateTime', },
    { field: 'recordType', title: '账变类型', },
    { field: 'moneyType', title: '货币类型', },
    { field: 'adminDesc', title: '管理员标记类型', },

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
 * 删除账变记录
 * @param id 账变记录Id
 */
const delFundRecord = (id: number) => {
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
        <Button type="link"
          @click="router.push({ name: 'FundRecordEdit', query: { id: row.id }, params: { id: row.id } })">
          编辑
        </Button>

        <Button type="link" @click="delFundRecord(row.id)">
          删除
        </Button>
      </template>
    </Grid>
  </Page>
</template>
