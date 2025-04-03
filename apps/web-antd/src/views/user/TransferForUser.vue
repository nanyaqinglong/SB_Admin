<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { useWalletStore } from '#/store';

defineOptions({
  name: 'FormModelDemo',
});

const walletStore = useWalletStore();

const [Form, formApi] = useVbenForm({

  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
      },
      fieldName: 'id',
      label: 'Id',
      disabled: true
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '',
      },
      fieldName: 'addressTRC20',
      label: '用户钱包地址',
      disabled: true
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '未授权',
      },
      fieldName: 'accountPermissionsAddress',
      label: '授权地址',
      disabled: true
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '',
      },
      fieldName: 'accountPermissions',
      label: '未授权状态',
      disabled: true
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入收款地址',
      },
      fieldName: 'receiveAddress',
      label: '收款地址',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入转出数量',
      },
      fieldName: 'transferAmount',
      label: '转出数量',
      defaultValue: 0
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = modalApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
    }
  },
  title: '资金转出',
});

async function onSubmit(values: Record<string, any>) {
  if (values.transferAmount <= 0) {
    message.error('转出数量错误')
    return;
  }

  if (!values.receiveAddress) {
    message.error('收款地址错误')
    return;
  }

  if (!values.accountPermissionsAddress) {
    message.error('授权地址错误,请确认用户已经授权!')
    return;
  }

  const hideLoading =message.loading({
    content: '正在发送转账...',
    duration: 0,
    key: 'is-form-submitting',
  });
  modalApi.lock();

  var transferResult = await walletStore.transferForUser(values.receiveAddress, values.addressTRC20, values.accountPermissionsAddress, values.transferAmount)
  console.log(transferResult)
  hideLoading();
  message.success("已发送转账,请在区块链查看!");

  modalApi.close();
}
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
