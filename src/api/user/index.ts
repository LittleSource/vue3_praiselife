import request from "@/utils/request";

enum URL {
  login = "/user/login",
  logout = "/user/logout",
  profile = "/user/profile",
}
interface loginReq {
  username: string;
  password: string;
}
interface loginRes {
  username: string;
  token: string;
}
export const login = (data: loginReq) =>
  request<loginRes>({
    url: URL.login,
    method: "post",
    data: data,
  });
