import { requestClient, sbRequestClient } from '#/api/request';

/**
 * 获取账变记录列表
 */
export async function getList(page: number, pageSize: number) {
  return requestClient.get('/FundRecord/List',
    {
      params: {
        page,
        pageSize
      }
    });
}

/**
 * 获取单个账变记录详情
 */
export async function getDetail(id: number) {
  return requestClient.get('/FundRecord/Detail', {
    params: { id }
  });
}

/**
* 新增单个账变记录
*/
export async function postAdd(data: any) {
  return sbRequestClient.post('/FundRecord/Add', data);
}

/**
 * 保存单个账变记录详情
 */
export async function postEdit(params: any) {
  if (params.id) {
    return sbRequestClient.post('/FundRecord/Edit', params);
  } else {
    return postAdd(params);
  }
}

/**
 * 删除账变记录
 */
export async function postDel(id: any) {
  return sbRequestClient.post('/FundRecord/Del', {
    id
  });
}
