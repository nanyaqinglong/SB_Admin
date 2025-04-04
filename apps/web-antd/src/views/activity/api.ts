import { requestClient, sbRequestClient } from '#/api/request';

/**
 * 获取活动列表
 */
export async function getList(page: number, pageSize: number) {
  return requestClient.get('/Activity/List',
    {
      params: {
        page,
        pageSize
      }
    });
}

/**
 * 获取单个活动详情
 */
export async function getDetail(id: number) {
  return requestClient.get('/Activity/Detail', {
    params: { id }
  });
}

/**
* 新增单个活动
*/
export async function postAdd(data: any) {
  return sbRequestClient.post('/Activity/Add', data);
}

/**
 * 保存单个活动详情
 */
export async function postEdit(params: any) {
  if (params.id) {
    return sbRequestClient.post('/Activity/Edit', params);
  } else {
    return postAdd(params);
  }
}

/**
 * 删除活动
 */
export async function postDel(id: any) {
  return sbRequestClient.post('/Activity/Del', {
    id
  });
}