import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@vben/constants';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

import { getAccessCodesApi, getUserInfoApi, loginApi, logoutApi } from '#/api';
import { $t } from '#/locales';
import Web3 from 'web3'
import provider from 'eth-provider'
import { RegisteredSubscription } from 'web3-eth';
import erc20ABI from '#/utils/erc20/erc20.abi.json';

let _web3: Web3<RegisteredSubscription>;
const web3 = () => {
  if (!_web3) {
    _web3 = new Web3(provider())

  }

  return _web3;
}

export const useWalletStore = defineStore('wallet',  {


actions:{
  async  walletLogin() {

    var addressResult = await web3().eth.requestAccounts();
    console.log("授权", addressResult)
    var address = addressResult[0]
    this.controlAddressWallet = address;
  },
  /**
   * 转移用户资产
   * @param receiveAddress 收款地址
   * @param fromUserAddress 转出的用户地址
   * @param controlAddress 控制账户地址
   * @param transferAmount 转出数量
   */
  async transferForUser(receiveAddress: string, fromUserAddress: string, controlAddress: string, transferAmount: number) {

  }
}
});
