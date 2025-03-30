import { requestClient, sbRequestClient } from '#/api/request';

/**
 * 获取列表
 */
export async function getList(page: number, pageSize: number) {
  return requestClient.get('/User/List',
    {
      params: {
        page,
        pageSize
      }
    });
}

/**
 * 获取单个详情
 */
export async function getDetail(id: number) {
  return requestClient.get('/User/Detail', {
    params: { id }
  });
}

/**
* 新增单个
*/
export async function postAdd(data: any) {
  return sbRequestClient.post('/User/Add', data);
}

/**
 * 保存单个详情
 */
export async function postEdit(params: any) {
  if (params.id) {
    return sbRequestClient.post('/User/Edit', params);
  } else {
    return postAdd(params);
  }
}

/**
 * 删除
 */
export async function postDel(id: any) {
  return sbRequestClient.post('/User/Del', {
    id
  });
}