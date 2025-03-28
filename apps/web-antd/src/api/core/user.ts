import type { UserInfo } from '@vben/types';

import { requestClient,baseRequestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/auth/info');
}

/**
 * 获取谷歌验证器绑定信息
 */
export async function getGoogleCodeQR() {
  return requestClient.get('/auth/GetGoogleCodeQR');
}

/**
 * 绑定谷歌验证器
 */
export async function postBindGoogleCode(googleCode:string) {
  return baseRequestClient.post('/auth/PostBindGoogleCode', {
    googleCode
  });
}
