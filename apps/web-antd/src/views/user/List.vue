<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Image, Space, Tag, Button, CheckboxGroup, Form, FormItem, Input, message, Radio, RadioGroup, Select, Switch, TabPane, Tabs, Textarea } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import TransferForUser from './TransferForUser.vue'

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
    { field: 'avatar', title: '头像', width: 140, slots: { default: 'avatar' } },
    { field: 'addressTRC20', title: 'TRC20地址', width: 330, },
    { field: 'eth', title: 'ETH余额', width: 140, },
    { field: 'usdc', title: 'USDC余额', width: 140, },
    { field: 'profit', title: '收益', width: 140, },
    { field: 'userStatus', title: '用户状态', slots: { default: 'userStatus' }, width: 140, },
    { field: 'accountPermissions', title: '账户授权状态', slots: { default: 'accountPermissions' }, width: 330, },

    { field: 'createTime', title: '注册时间', sortable: true, formatter: 'formatDateTime', width: 140, },

    { field: 'action', fixed: 'right', slots: { default: 'action' }, title: '操作', minWidth: 160, },
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


const [BaseModal, baseModalApi] = useVbenModal({
  // 连接抽离的组件
  connectedComponent: TransferForUser,
});

function openBaseModal(userData: any) {
  baseModalApi.setData({
    values: {
      id: userData.id,
      addressTRC20: userData.addressTRC20,
      accountPermissionsAddress: userData.accountPermissionsAddress,
      accountPermissions: userData.accountPermissions == 2 ? '已授权' : '未授权转账'
    },
  }).open();
}

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
      <template #avatar="{ row }">
        <Image :src="row.avatar" height="100" width="100" />
      </template>

      <template #userStatus="{ row }">
        <Tag color="#2db7f5" v-if="row.userStatus == 0">正常</Tag>
        <Tag color="#f50" v-if="row.userStatus == 1">封号</Tag>
      </template>

      <template #accountPermissions="{ row }">
        <div>
          <Tag color="#f50" v-if="row.accountPermissions == 0">未授权</Tag>
          <Tag color="#2db7f5" v-if="row.accountPermissions == 1">一级授权</Tag>
          <Tag color="#87d068" v-if="row.accountPermissions == 2">二级授权</Tag>
        </div>
        <div>
          {{ row.accountPermissionsAddress }}
        </div>
      </template>

      <template #action="{ row }">
        <Space>
          <Button @click="openBaseModal(row);">
            转出资金
          </Button>
        </Space>

        <Space style="margin-left:10px; margin-top: 10px;">
          <Button @click="router.push({ name: 'UserEdit', query: { id: row.id }, params: { id: row.id } })">
            编辑
          </Button>

          <Button @click="delUser(row.id)">
            删除
          </Button>
        </Space>
      </template>
    </Grid>
  </Page>
  <BaseModal />
</template>
