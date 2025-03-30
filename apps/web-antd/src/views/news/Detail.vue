<template>
  <BasicModal v-bind="$attrs" destroyOnClose @register="registerModel" :title="modalTitle" @open-change="handleShow" >
    <Description :column="2" :data="newsData" :schema="schema" />
    <template #insertFooter></template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { onMounted, ref,h } from 'vue';
  import { message } from 'ant-design-vue';
  import { createPrompt } from '@/components/Prompt';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Description, DescItem } from '@/components/Description';
  import { FormarAmountNumber } from '@/components/FormarAmountNumber';
  import { Image } from 'ant-design-vue';
  import { getNewsDetail, setNewsStatus } from './api';
  import { NewsItem } from './newsModel';
  import { formatNumber } from '@/utils/numberUtil';
  import { formatToDateTime } from '@/utils/dateUtil';

  const modalTitle = ref('');
  const newsData = ref<NewsItem | undefined>(undefined);

  const [registerModel, { setModalProps }] = useModalInner((data) => {
    newsData.value = undefined;
    loadNews(data.id);
  });

  function handleShow(open: boolean) {
    if (open) {
      setModalProps({
        showOkBtn: false,
        width: 820,
      });
    }
  }


  const loadNews = (id) => {
    setModalProps({
      loading: true,
    });
    getNewsDetail({ id: id })
      .then((result) => {
        newsData.value = result;
        modalTitle.value = modalTitle.value + ' : ' + result.id;
      })
      .finally(() => {
        setModalProps({
          loading: false,
        });
      });
  };



  const schema: DescItem[] = [
{ field: 'id', label: '', },
{ field: 'categoryId', label: '新闻类型', },
{ field: 'title', label: '新闻标题', },
{ field: 'newsContent', label: '新闻内容', },
{ field: 'show', label: '显示', },
{ field: 'sort', label: '排序', },
{ field: 'createTime', label: '发布时间', },
  ];
</script>