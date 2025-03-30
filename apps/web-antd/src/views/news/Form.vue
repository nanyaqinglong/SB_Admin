<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import dayjs from 'dayjs';

import {
  getDetail,
  postAdd,
  postEdit,
  postDel,
  getCategoryList
} from './api';

const router = useRouter();
const route = useRoute();

const id = ref<number>(0);

onMounted(async () => {
  id.value = route.query.id;
  if (id.value > 0) {
    getDetail(id.value).then((result) => {
      result.createTime = dayjs(result.createTime),
        baseFormApi.setValues(result);
    });
  }
});

const [BaseForm, baseFormApi] = useVbenForm({
  commonConfig: {
    colon: true,
    componentProps: {
      class: 'w-full',
    },
  },
  fieldMappingTime: [['rangePicker', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  handleSubmit: onSubmit,

  layout: 'horizontal',
  schema: [
    {
      fieldName: 'categoryId',
      component: 'ApiSelect',
      label: '新闻类型',
      rules: 'required',
      // defaultValue: '0', 
      componentProps: {
        placeholder: '请选择新闻类型',
        // 菜单接口转options格式
        afterFetch: (data: { name: string; id: number }[]) => {
          if (id.value == undefined || id.value <= 0) {
            baseFormApi.setValues({ categoryId: data.items[0].id });
          }

          return data.items.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
        },
        api: getCategoryList,
      },
    },
    {
      fieldName: 'title',
      component: 'Input',
      label: '标题',
      rules: 'required',
      defaultValue: '0',
      componentProps: {
        placeholder: '请输入新闻公告标题',

      },
    },

    {
      fieldName: 'show',
      component: 'Switch',
      label: '显示',
      rules: 'required',
      defaultValue: '0',
      componentProps: {
        placeholder: '请输入新闻公告显示',
        checkedChildren: '开',
        unCheckedChildren: '关'
      },
    },
    {
      fieldName: 'sort',
      component: 'Input',
      label: '排序',
      rules: 'required',
      defaultValue: '0',
      componentProps: {
        placeholder: '请输入新闻公告排序',

      },
    },
    {
      fieldName: 'newsContent',
      component: 'Input',
      label: '内容',
      rules: 'required',
      defaultValue: '0',
      componentProps: {
        placeholder: '请输入新闻公告内容',
      },
      // 从第三列开始 相当于中间空了一列
      formItemClass: 'col-span-3 items-baseline',
    },
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

function onSubmit(values: Record<string, any>) {
  if (id.value > 0) {
    values.id = id.value;
    postEdit(values).then((result) => {
      if (result.code == 0) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    });
  } else {
    postAdd(values).then((result) => {
      if (result.code == 0) {
        id.value = result.data.id;
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    });
  }
}
</script>

<template>
  <Card title="新闻公告" style="margin: 10px">
    <BaseForm />
  </Card>
</template>
