import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 获取分类列表包含系统设置
 */
export async function getCategoryWithSettingList(params: any) {
  return requestClient.get(
    '/SystemSetting/GetCategoryWithSettingList',
    { params }
  );
}

/**
 * 获取系统设置列表
 */
export async function getList(page: number, pageSize: number) {
  return requestClient.get('/SystemSetting/List',
    {
      params: {
        page,
        pageSize
      }
    });
}


/**
 * 获取单个系统设置详情
 */
export async function getDetail(id: number) {
  return requestClient.get('/SystemSetting/Detail', {
    params: {
      id
    },
  }
  );
}

/**
 * 添加系统设置
 */
export async function postAddSystemSetting(data: any) {
  return baseRequestClient.post('/SystemSetting/Add', data);
}

/**
 * 修改系统设置
 */
export async function postEditSystemSetting(data: any) {
  return baseRequestClient.post('/SystemSetting/Edit', data);
}

/**
 * 保存多个系统设置详情
 */
export async function saveSystemSettingList(data: any) {
  return baseRequestClient.post('/SystemSetting/SaveList', {
    settings: data
  });
}

/**
 * 删除系统设置
 */
export async function delSystemSetting(id: number) {
  return requestClient.post('/SystemSetting/Del',
    {
      data: {
        id
      },
    });
}
