import axios from "axios";
import {setUserName} from "../redux/userSlice";

export const initAxios = dispatch => {
    axios.defaults.baseURL = "api";
    axios.defaults.validateStatus = status => {
        [401, 500].includes(status) && dispatch(setUserName(""));
        return true;
    };
};

// 访问后台获得登录状态
// export const apiGetUser = async () => (await axios.get("currentUser"));
// 模拟已登陆
export const apiGetUser = async () => new Promise((resolve) => {
    setTimeout(()=> {
        resolve({status: 200, data: {data: {name: "Ethen"}}});
    }, 2000);
});
// 模拟未登录
// export const apiGetUser = async () => (await setTimeout(() => ({data: {data: {user: ""}}}), 2000));

export const apiLogin = async userInfo => (await axios.post("login/account", userInfo)).data;

// export const apiLogout = async () => (await axios.post("login/outLogin")).data;
export const apiLogout = async () => new Promise((resolve) => {
    setTimeout(()=> {
        resolve({status: 401, data: {data: {result: true}}});
    }, 2000);
});