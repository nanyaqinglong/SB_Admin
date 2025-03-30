import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';

export type NewsParams = Partial<BasicPageParams>;

/**
 * 
 * @interface News
 * @property {number} id - 
 * @property {number} categoryId - 新闻类型
 * @property {string} title - 新闻标题
 * @property {text} newsContent - 新闻内容
 * @property {boolean} show - 显示
 * @property {number} sort - 排序
 * @property {timestamp} createTime - 发布时间
 */
export interface NewsItem {
  id: number;
  categoryId: number;
  title: string;
  newsContent: text;
  show: boolean;
  sort: number;
  createTime: timestamp;
}

export type NewsGetResultModel = BasicFetchResult<NewsItem>;