<script lang="ts" setup>
import { h, onMounted, ref } from 'vue';

import { useUserStore } from '@vben/stores';
import { useAuthStore } from '#/store';

import { Card,Input, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getGoogleCodeQR ,postBindGoogleCode  } from '#/api';

const userStore = useUserStore();
const authStore = useAuthStore();
const loading = ref(false);

onMounted( () => {
  authStore.fetchUserInfo().then((resultUser)=>{
    console.log(resultUser)
    if(!resultUser.bindGoogle){
      getGoogleCodeQR().then((resultGoogle)=>{
        console.log(resultGoogle)
        baseFormApi.setValues({
          username:resultUser.username,
          ManualEntryKey:  resultGoogle.manualEntryKey,
          qrCodeImageUrl:  resultGoogle.qrBase64
        });
      })
      
    }
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

  handleSubmit: onSubmit,

  layout: 'horizontal',
  schema: [
    {
      component: 'Input',
      componentProps: {
        disabled: true,
      },
      fieldName: 'username',
      label: '用户名',
      rules: 'required',
    },

    {
      component: 'Input',
      componentProps: {
        placeholder: '绑定代码',
        disabled: true,
      },
      fieldName: 'ManualEntryKey',
      label: '绑定代码',
      rules: 'required',
    },
    {
      component: 'Radio',
      componentProps: {
        placeholder: '绑定二维码',
      },
      fieldName: 'qrCodeImageUrl',
      label: '绑定二维码',
      renderComponentContent: (r) => {
        return {
          default: () => h('img',{src:r.qrCodeImageUrl}),
        };
      },
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入验证谷歌验证码',
      },
      fieldName: 'googleCode',
      label: '验证谷歌代码',
      rules: 'required',
    },
   
  ],
  wrapperClass: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
});

function onSubmit(values: Record<string, any>) {
  const googleCode = values.googleCode;

  if (!googleCode) {
    message.error('请输入谷歌验证器代码');
    return;
  }

  loading.value = true;
  postBindGoogleCode(googleCode)
    .then((result) => {
      if (result.code == 0) {
        message.success(result.message);
        document.location.reload()
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
  <Card title="谷歌验证器" style="margin: 10px" v-loading="loading">
    <div v-if="userStore.$state.userInfo.bindGoogle" >
      绑定谷歌验证器时间:{{userStore.$state.userInfo.authenticatorBindTime}}
    </div>
    <BaseForm v-else >

    </BaseForm>
  </Card>
</template>
