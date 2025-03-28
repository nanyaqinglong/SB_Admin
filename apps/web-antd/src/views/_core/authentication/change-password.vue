<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { useUserStore } from '@vben/stores';

import { Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { changePasswordApi } from '#/api';

const userStore = useUserStore();
const loading = ref(false);

onMounted(async () => {
  baseFormApi.setValues({
    username: userStore.$state.userInfo.username,
  });
});

const [BaseForm, baseFormApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        disabled: true,
      },
      // defaultValue: userStore.username,
      // 字段名
      fieldName: 'username',
      // 界面显示的label
      label: '用户名',
      rules: 'required',
    },

    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入旧密码',
      },
      fieldName: 'oldPassword',
      label: '旧密码',
      rules: 'required',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入新密码',
      },
      fieldName: 'newPassword',
      label: '新密码',
      rules: 'required',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入确认新密码',
      },
      fieldName: 'confirPassword',
      label: '确认新密码',
      rules: 'required',
    },
  ],
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
});

function onSubmit(values: Record<string, any>) {
  const oldPassword = values.oldPassword;
  const newPassword = values.newPassword;
  const confirPassword = values.confirPassword;

  if (!oldPassword) {
    message.error('请输入旧密码');
    return;
  }

  if (!newPassword) {
    message.error('请输入新密码');
    return;
  }

  if (newPassword.length < 6) {
    message.error('新密码必须6位以上');
    return;
  }

  if (!confirPassword) {
    message.error('请输入新确认密码');
    return;
  }

  if (newPassword != confirPassword) {
    message.error('确认密码错误');
    return;
  }

  loading.value = true;
  changePasswordApi({ oldPassword, newPassword })
    .then((result) => {
      if (result.code == 0) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <Card title="修改密码" style="margin: 10px" v-loading="loading">
    <BaseForm />
  </Card>
</template>
