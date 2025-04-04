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
{fieldName: 'userId',component: 'Input',label: '用户Id',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入用户参加活动记录用户Id',},},
{fieldName: 'activityId',component: 'Input',label: '活动Id',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入用户参加活动记录活动Id',},},
{fieldName: 'targetAmount',component: 'Input',label: '目标数量',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入用户参加活动记录目标数量',},},
{fieldName: 'completedAmount',component: 'Input',label: '已完成数量',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入用户参加活动记录已完成数量',},},
{fieldName: 'completedStatus',component: 'Input',label: '完成状态',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入用户参加活动记录完成状态',},},
{fieldName: 'createTime',component: 'Input',label: '参加活动时间',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入用户参加活动记录参加活动时间',},},
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
  <Card title="用户参加活动记录" style="margin: 10px">
    <BaseForm />
  </Card>
</template>