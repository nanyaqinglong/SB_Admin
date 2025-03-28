<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

import {
  getCategoryWithSettingList,
  getDetail,
  postAddSystemSetting,
  postEditSystemSetting,
} from './api';

const router = useRouter();
const route = useRoute();

const id = ref<number>(0);

onMounted(async () => {
  id.value = route.query.id;
  if (id.value > 0) {
    getDetail(id.value).then((result) => {
      baseFormApi.setValues(result);
      updateDataContentConfig();
    });
  }
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
  fieldMappingTime: [['rangePicker', ['startTime', 'endTime'], 'YYYY-MM-DD']],
  // 提交函数
  handleSubmit: onSubmit,

  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      fieldName: 'categoryId',
      component: 'ApiSelect',
      label: '分类',
      rules: 'required',
      componentProps: {
        api: getCategoryWithSettingList,
        placeholder: '请选择分类',
        resultField: 'items',
        labelField: 'name',
        valueField: 'id',
        immediate: true,
      },
    },
    {
      fieldName: 'displayType',
      component: 'Select',
      label: '输入类型',
      rules: 'required',
      defaultValue: 0,
      componentProps: {
        options: [
          {
            label: '单行文本框',
            value: 0,
            key: '0',
          },
          {
            label: '多行文本框',
            value: 1,
            key: '1',
          },
          {
            label: '单选Radio',
            value: 2,
            key: '2',
          },
          {
            label: '单选Select',
            value: 3,
            key: '3',
          },
          {
            label: '多选Checkbox',
            value: 4,
            key: '4',
          },
          {
            label: '滑动开关',
            value: 5,
            key: '5',
          },
          {
            label: '文件上传',
            value: 6,
            key: '6',
          },
        ],
        onChange: (e: any) => {
          updateDataContentConfig();
        },
      },
    },
    {
      fieldName: 'key',
      component: 'Input',
      label: '设置系统键',
      rules: 'required',
      componentProps: {
        placeholder: '请输入系统设置设置系统键',
      },
    },
    {
      fieldName: 'name',
      component: 'Input',
      label: '设置名称',
      rules: 'required',
      componentProps: {
        placeholder: '请输入系统设置设置名称',
      },
    },
    {
      fieldName: 'dataContent',
      component: 'Input',
      label: '设置数据内容',
      componentProps: {
        placeholder: '请输入系统设置设置数据内容',
      },
    },
    {
      fieldName: 'sort',
      component: 'Input',
      label: '显示排序',
      rules: 'required',
      defaultValue: '0',
      componentProps: {
        placeholder: '请输入系统设置显示排序',
      },
    },
    {
      fieldName: 'cantDelete',
      component: 'RadioGroup',
      label: '是否可以删除',
      defaultValue: true,
      rules: 'required',
      componentProps: {
        options: [
          { label: '不可删除', value: true },
          { label: '可以删除', value: false },
        ],
      },
    },

    {
      fieldName: 'dataContentConfig',
      component: 'Input',
      label: '数据选项',
      rules: 'required',
      defaultValue:
        '[{ "label": "选项1", "value": "1" },{ "label": "选项2", "value": "0" }]',
      componentProps: {
        autoSize: { minRows: 6 },
        onChange: (e: any) => {
          // dataContentConfig.value = e.target.value;
          // updateDataContentConfig();
        },
      },
    },
  ],
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

const updateDataContentConfig = async () => {
  const fromValues = await baseFormApi.getValues();
  let component = 'Input';
  const displayType = fromValues.displayType;
  const dataContentConfig = fromValues.dataContentConfig;

  baseFormApi.setState((prev) => {
    switch (displayType) {
      case 1: {
        component = 'Textarea';
        break;
      }
      case 2: {
        component = 'RadioGroup';
        break;
      }

      case 3: {
        component = 'Select';
        break;
      }

      case 4: {
        component = 'CheckboxGroup';
        break;
      }

      case 5: {
        component = 'Switch';
        break;
      }

      case 6: {
        component = 'Upload';
        break;
      }

      case 0:

      default: {
        component = 'Input';
        break;
      }
    }
    return {
      schema: prev.schema?.map((item) => {
        if (item.fieldName === 'dataContent') {
          switch (displayType) {
            case 2:
            case 3:
            case 4: {
              // case 5:
              var options = [];
              options = JSON.parse(dataContentConfig);
              return {
                ...item,
                component,
                componentProps: {
                  options,
                },
              };
              break;
            }

            default: {
              var options = [];
              options = JSON.parse(dataContentConfig);
              return {
                ...item,
                component,
              };
              break;
            }
          }
        }
        return item;
      }),
    };
  });
};

function onSubmit(values: Record<string, any>) {
  if (id.value > 0) {
    values.id = id.value;
    postEditSystemSetting(values).then((result) => {
      if (result.code == 0) {
        message.success(result.message);
      } else {
        message.error(result.message);
      }
    });
  } else {
    postAddSystemSetting(values).then((result) => {
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
  <Card title="系统设置" style="margin: 10px">
    <BaseForm />
  </Card>
</template>
