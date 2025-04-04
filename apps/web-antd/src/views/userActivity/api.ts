import { requestClient, sbRequestClient } from '#/api/request';

/**
 * 获取用户参加活动记录列表
 */
export async function getList(page: number, pageSize: number) {
  return requestClient.get('/UserActivity/List',
    {
      params: {
        page,
        pageSize
      }
    });
}

/**
 * 获取单个用户参加活动记录详情
 */
export async function getDetail(id: number) {
  return requestClient.get('/UserActivity/Detail', {
    params: { id }
  });
}

/**
* 新增单个用户参加活动记录
*/
export async function postAdd(data: any) {
  return sbRequestClient.post('/UserActivity/Add', data);
}

/**
 * 保存单个用户参加活动记录详情
 */
export async function postEdit(params: any) {
  if (params.id) {
    return sbRequestClient.post('/UserActivity/Edit', params);
  } else {
    return postAdd(params);
  }
}

/**
 * 删除用户参加活动记录
 */
export async function postDel(id: any) {
  return sbRequestClient.post('/UserActivity/Del', {
    id
  });
}