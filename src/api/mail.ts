import { get, post } from '/@/utils/http/axios';
import { UserState } from '/@/store/modules/user/types';

enum URL {
  send = '/api/mail/send',
  verify = '/api/mail/verify',
}
interface LoginRes {
  token: string;
}

export interface mailData {
  id: string;
  usermail: string;
}

export interface captchaVerify {
  usermail: string;
  captcha: string;
}

const sendApi = async (data: mailData) =>
  post<any>({ url: URL.send, data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });

const verifyApi = async (data: captchaVerify) => post<any>({ url: URL.verify, data, headers: {} });

export { sendApi, verifyApi };
