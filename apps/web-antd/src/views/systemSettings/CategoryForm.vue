<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import dayjs from 'dayjs';

import {
  posCategorytAdd,
} from './api';

const router = useRouter();
const route = useRoute();

const id = ref<number>(0);

onMounted(async () => {});

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
{fieldName: 'name',component: 'Input',label: '名称',rules: 'required',componentProps: {placeholder: '请输入设置分类名称',},},
{fieldName: 'icon',component: 'IconPicker',label: '图标',rules: 'required',defaultValue: 'ant-design:crown-outlined',componentProps: {placeholder: '请输入设置分类图标',},},
{fieldName: 'sort',component: 'Input',label: '排序',rules: 'required',defaultValue: '0',componentProps: {placeholder: '请输入设置分类排序',},},
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

function onSubmit(values: Record<string, any>) {
  posCategorytAdd(values).then((result) => {
      if (result.code == 0) {
        id.value = result.data.id;
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    });
}
</script>

<template>
  <Card title="设置分类" style="margin: 10px">
    <BaseForm />
  </Card>
</template>
