<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import {Button,CheckboxGroup,Form,FormItem,Input,message,Radio,RadioGroup,Select,Switch,TabPane,Tabs,Textarea} from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { getList , postDel
 } from './api';

 const router = useRouter();

interface RowType {
  // productName: string;
  // releaseDate: string;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
{ fixed: 'left', title: 'Id', type: 'seq', width: 50 },{ field: 'userId', title: '用户Id',  },
{ field: 'activityId', title: '活动Id',  },
{ field: 'targetAmount', title: '目标数量',  sortable: true,  },
{ field: 'completedAmount', title: '已完成数量',  sortable: true,  },
{ field: 'completedStatus', title: '完成状态',  sortable: true,  },
{ field: 'createTime', title: '参加活动时间',  sortable: true,  },

{field: 'action',fixed: 'right',slots: { default: 'action' },title: '操作',width: 120,},
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

const [Grid,gridApi] = useVbenVxeGrid({ gridOptions });


        

/**
 * 删除用户参加活动记录
 * @param id 用户参加活动记录Id
 */
const delUserActivity = (id: number) => {
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
        <Button type="link" @click="router.push({ name: 'UserActivityEdit', query: { id: row.id } , params: { id: row.id } })">
          编辑
        </Button>

        <Button type="link" @click="delUserActivity(row.id)">
          删除
        </Button>
      </template>
    </Grid>
  </Page>
</template>