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
    { fieldName: 'addressTRC20', component: 'Input', label: 'TRC20地址', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入TRC20地址', }, },
    { fieldName: 'avatar', component: 'Input', label: '头像', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入头像', }, },
    { fieldName: 'eTH', component: 'Input', label: 'ETH余额', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入ETH余额', }, },
    { fieldName: 'uSDC', component: 'Input', label: 'USDC余额', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入USDC余额', }, },
    { fieldName: 'profit', component: 'Input', label: '收益', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入收益', }, },
    { fieldName: 'createTime', component: 'DatePicker', label: '注册时间', rules: 'required', componentProps: { placeholder: '请选择注册时间', showTime: { format: 'HH:mm:ss' } }, },
    { fieldName: 'userStatus', component: 'Input', label: '用户状态', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入用户状态', }, },
    { fieldName: 'accountPermissions', component: 'Input', label: '账户授权状态', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账户授权状态', }, },
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
  <Card title="" style="margin: 10px">
    <BaseForm />
  </Card>
</template>
