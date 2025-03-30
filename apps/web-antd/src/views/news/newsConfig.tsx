import { FormProps, BasicColumn } from '@/components/Table';
import { type FormSchema } from '@/components/Form';








export function getNewsTableColumns(): BasicColumn[] {
  return [
{ title: '新闻类型', dataIndex: 'categoryId',  },
{ title: '新闻标题', dataIndex: 'title',  },
{ title: '新闻内容', dataIndex: 'newsContent',  },
{ title: '显示', dataIndex: 'show',  },
{ title: '排序', dataIndex: 'sort',  },
{ title: '发布时间', dataIndex: 'createTime',  },
  ];
}


export function getNewsTableFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showAdvancedButton: false,
    schemas: [
    ],
  };
}

export function getNewsFormConfig(): FormSchema[] {
  return [
{ field: 'categoryId', component: 'Input', label: '新闻类型', colProps: { span: 24, md: 12, lg: 12, xl: 6, xxl: 3 }, componentProps: { placeholder: '请输入新闻类型', onChange: (e: any) => { console.log(e); }, }, },
{ field: 'title', component: 'Input', label: '新闻标题', colProps: { span: 24, md: 12, lg: 12, xl: 6, xxl: 3 }, componentProps: { placeholder: '请输入新闻标题', onChange: (e: any) => { console.log(e); }, }, },
{ field: 'newsContent', component: 'Input', label: '新闻内容', colProps: { span: 24, md: 12, lg: 12, xl: 6, xxl: 3 }, componentProps: { placeholder: '请输入新闻内容', onChange: (e: any) => { console.log(e); }, }, },
{ field: 'show', component: 'Input', label: '显示', colProps: { span: 24, md: 12, lg: 12, xl: 6, xxl: 3 }, componentProps: { placeholder: '请输入显示', onChange: (e: any) => { console.log(e); }, }, },
{ field: 'sort', component: 'Input', label: '排序', colProps: { span: 24, md: 12, lg: 12, xl: 6, xxl: 3 }, componentProps: { placeholder: '请输入排序', onChange: (e: any) => { console.log(e); }, }, },
{ field: 'createTime', component: 'Input', label: '发布时间', colProps: { span: 24, md: 12, lg: 12, xl: 6, xxl: 3 }, componentProps: { placeholder: '请输入发布时间', onChange: (e: any) => { console.log(e); }, }, },
  ];
}