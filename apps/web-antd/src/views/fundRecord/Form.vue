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

const id = ref<string>('');

onMounted(async () => {
  id.value = route.query.id;
  console.log(id.value)
  if (id.value != undefined && id.value != '') {
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
    { fieldName: 'userId', component: 'Input', label: '用户Id', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录用户Id', }, },
    { fieldName: 'userTargetId', component: 'Input', label: '目标用户Id', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录目标用户Id', }, },
    { fieldName: 'changeQuantity', component: 'Input', label: '变动数量', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录变动数量', }, },
    { fieldName: 'beforeChangeQuantity', component: 'Input', label: '变动数量前', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录变动数量前', }, },
    { fieldName: 'afterChangeQuantity', component: 'Input', label: '变动数量后', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录变动数量后', }, },
    { fieldName: 'busId1', component: 'Input', label: '业务Id1', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录业务Id1', }, },
    { fieldName: 'busId2', component: 'Input', label: '业务Id2', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录业务Id2', }, },
    { fieldName: 'busId3', component: 'Input', label: '业务Id3', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录业务Id3', }, },
    { fieldName: 'desc', component: 'Input', label: '记录描述', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录记录描述', }, },
    { fieldName: 'remark', component: 'Input', label: '记录描述', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录记录描述', }, },
    { fieldName: 'createTime', component: 'DatePicker', label: '记录时间', rules: 'required', componentProps: { placeholder: '请选择账变记录记录时间', showTime: { format: 'HH:mm:ss' } }, },
    { fieldName: 'recordType', component: 'Input', label: '账变类型', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录账变类型', }, },
    { fieldName: 'moneyType', component: 'Input', label: '货币类型', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录货币类型', }, },
    { fieldName: 'adminDesc', component: 'Input', label: '管理员标记类型', rules: 'required', defaultValue: '0', componentProps: { placeholder: '请输入账变记录管理员标记类型', }, },
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
  <Card title="FundRecord" style="margin: 10px">
    <BaseForm />
  </Card>
</template>
