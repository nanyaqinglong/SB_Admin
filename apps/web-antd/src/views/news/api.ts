import { requestClient, sbRequestClient } from '#/api/request';

/**
 * 获取列表
 */
export async function getList(page: number, pageSize: number) {
  return requestClient.get('/News/List',
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
  return requestClient.get('/News/Detail', {
    params: { id }
  });
}

/**
* 新增单个
*/
export async function postAdd(data: any) {
  return sbRequestClient.post('/News/Add', data);
}

/**
 * 保存单个详情
 */
export async function postEdit(params: any) {
  if (params.id > 0) {
    return sbRequestClient.post('/News/Edit', params);
  } else {
    return postAdd(params);
  }
}

/**
 * 删除
 */
export async function postDel(id: any) {
  return sbRequestClient.post('/News/Del', {
    id
  });
}

/**
 * 修改显示状态
 */
export async function postChangeShow(id: any) {
  return sbRequestClient.post('/News/ChangeShow', {
    id
  });
}



/**
 * 获取分类列表
 */
export async function getCategoryList(page: number, pageSize: number) {
  return requestClient.get('/NewsCategory/List',
    {
      params: {
        page,
        pageSize
      }
    });
}

/**
* 新增单个分类
*/
export async function postCategoryAdd(data: any) {
  return sbRequestClient.post('/NewsCategory/Add', data);
}

/**
 * 删除分类
 */
export async function postCategoryDel(id: any) {
  return sbRequestClient.post('/NewsCategory/Del', {
    id
  });
}
