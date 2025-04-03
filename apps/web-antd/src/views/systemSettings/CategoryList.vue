<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import {Button,CheckboxGroup,Form,FormItem,Input,message,Radio,RadioGroup,Select,Switch,TabPane,Tabs,Textarea} from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { getCategoryList , posCategorytDel } from './api';

 const router = useRouter();

interface RowType {
  // productName: string;
  // releaseDate: string;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
{ fixed: 'left', title: 'Id', type: 'seq', width: 50 },{ field: 'name', title: '名称',  },
{ field: 'icon', title: '图标',  },
{ field: 'sort', title: '排序',  sortable: true,  },

{field: 'action',fixed: 'right',slots: { default: 'action' },title: '操作',width: 120,},
  ],
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        return await getCategoryList(page.currentPage, page.pageSize);
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
 * 删除设置分类
 * @param id 设置分类Id
 */
const delSystemSettingCategory = (id: number) => {
  posCategorytDel(id).then((result: any) => {
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
        <Button type="link" @click="delSystemSettingCategory(row.id)">
          删除
        </Button>
      </template>
    </Grid>
  </Page>
</template>
