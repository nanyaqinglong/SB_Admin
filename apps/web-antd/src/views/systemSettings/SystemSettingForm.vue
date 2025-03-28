<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import {
  Button,
  CheckboxGroup,
  Form,
  FormItem,
  Input,
  message,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TabPane,
  Tabs,
  Textarea,
} from 'ant-design-vue';

import { getCategoryWithSettingList, saveSystemSettingList } from './api';

const loading = ref(false);

const activeCategoryId = ref();
const settingCategoryList = ref();
const settingItemList = ref();

onMounted(() => {
  loadData();
});

const loadData = () => {
  getCategoryWithSettingList().then((result) => {
    settingCategoryList.value = result.items;
    if (
      settingCategoryList.value.length > 0 &&
      settingCategoryList.value[0].systemSettingList.length > 0
    ) {
      settingItemList.value = processData(
        settingCategoryList.value[0].systemSettingList,
      );
      activeCategoryId.value = settingCategoryList.value[0].id;
    }
  });
};

const processData = (settingData: any) => {
  for (const settingItem of settingData) {
    switch (settingItem.displayType) {
      case 2:
      case 3:
      case 4:
      case 5: {
        settingItem.configJsonData = JSON.parse(settingItem.dataContentConfig);
        break;
      }
    }

    settingItem.dataContent = JSON.parse(settingItem.dataContent);
  }
  return settingData;
};

const onSubmit = (settingFormData) => {
  const json = JSON.stringify(settingFormData);

  const settingArr = [];

  settingFormData.forEach((setting) => {
    let dataContent = '';
    dataContent =
      setting.displayType == 4
        ? JSON.stringify(setting.dataContent)
        : setting.dataContent;

    settingArr.push({
      id: setting.id,
      dataContent,
    });
  });

  const datJson = JSON.stringify(settingArr);
  loading.value = true;
  saveSystemSettingList(datJson)
    .then((result) => {
      loading.value = false;
      message.success(result.message);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <div style="padding: 20px" v-loading="loading">
    <Tabs v-model:active-key="activeCategoryId">
      <TabPane v-for="category in settingCategoryList" :key="category.id">
        <template #tab>
          <div style="padding: 0 15px">
            <Icon :icon="category.icon" />
            <span>
              {{ category.name }}
            </span>
          </div>
        </template>
        <Form
          @submit="onSubmit(category.systemSettingList)"
          :label-col="{ span: 8 }"
          layout="vertical"
        >
          <FormItem
            v-for="item in category.systemSettingList"
            :label="item.name"
            :name="item.key"
          >
            <Input
              v-model:value="item.dataContent"
              v-if="item.displayType == 0"
            />
            <Textarea
              v-model:value="item.dataContent"
              v-if="item.displayType == 1"
            />

            <RadioGroup
              v-model:value="item.dataContent"
              v-if="item.displayType == 2"
            >
              <Radio
                v-for="config in item.configJsonData"
                :value="config.value"
              >
                {{ config.label }}
              </Radio>
            </RadioGroup>

            <Select
              allow-clear
              v-model:value="item.dataContent"
              v-if="item.displayType == 3"
            >
              <Select.Option
                v-for="config in item.configJsonData"
                :value="config.value"
              >
                {{ config.label }}
              </Select.Option>
            </Select>

            <CheckboxGroup
              v-model:value="item.dataContent"
              :options="item.configJsonData"
              v-if="item.displayType == 4"
            />

            <Switch
              v-model:checked="item.dataContent"
              v-if="item.displayType == 5"
            />
          </FormItem>

          <FormItem>
            <div style="display: flex; justify-content: end">
              <Button type="primary" html-type="submit">保存</Button>
            </div>
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
  </div>
</template>
