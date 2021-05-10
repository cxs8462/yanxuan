import axios from "axios";
import { getToken } from "@/utils/token";
import { Toast } from "vant";
import store from "@/store/index";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // 跨域类型时是否在请求中协带cookie
});
const getNewHeaders = () => {
  return { "x-nideshop-token": getToken() };
};
export default class HttpUtil {
  static get(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params, headers: getNewHeaders() })
        .then(({ data }) => {
          if (data.errno === 0) {
            resolve(data.data);
          } else {
            resolve(data);
            if (data.errno === 401) {
              Toast.fail("未登录状态！");
            } else {
              Toast.fail(data.errmsg);
            }
          }
        })
        .catch((err) => {
          reject({ err: JSON.stringify(err) });
        });
    });
  }
  static post(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, { ...params }, { headers: getNewHeaders() })
        .then(({ data }) => {
          resolve(data);
          if (data.errno !== 0) {
            Toast.fail(data.errmsg);
            if (data.errno === 401) {
              store.commit("setLoginShow", true);
            }
          }
        })
        .catch((err) => {
          reject({ err: JSON.stringify(err) });
        });
    });
  }
  static uppic(url, data) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, data, {
          headers: {
            ...getNewHeaders(),
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject({ err: JSON.stringify(err) });
        });
    });
  }
}
