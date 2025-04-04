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
} from './api';

const router = useRouter();
const route = useRoute();

const id = ref<number>(0);

onMounted(async () => {
  id.value = route.query.id;
  if (id.value > 0) {
    getDetail(id.value).then((result) => {
result.startTime = dayjs(result.startTime)
result.endTime = dayjs(result.endTime)
result.createTime = dayjs(result.createTime)
      
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
{fieldName: 'name',component: 'Input',label: '活动名称',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入活动活动名称',},},
{fieldName: 'startTime',component: 'DatePicker',label: '开始时间',rules: 'required', componentProps: {placeholder: '请选择活动开始时间', showTime: { format: 'HH:mm:ss' } },},
{fieldName: 'endTime',component: 'DatePicker',label: '结束时间',rules: 'required', componentProps: {placeholder: '请选择活动结束时间', showTime: { format: 'HH:mm:ss' } },},
{fieldName: 'targetAmount',component: 'Input',label: '目标数量',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入活动目标数量',},},
{fieldName: 'completedAmount',component: 'Input',label: '已完成数量',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入活动已完成数量',},},
{fieldName: 'activityStatus',component: 'Input',label: '活动状态',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入活动活动状态',},},
{fieldName: 'createTime',component: 'DatePicker',label: '创建时间',rules: 'required', componentProps: {placeholder: '请选择活动创建时间', showTime: { format: 'HH:mm:ss' } },},
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
  <Card title="活动" style="margin: 10px">
    <BaseForm />
  </Card>
</template>