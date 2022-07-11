import request from "@/utils/request";
import { bannerRes, serviceRes } from "./types";
export const getBanner = () =>
  request<bannerRes>({
    url: "index/banner",
    method: "GET",
  });

export const getServiceList = () =>
  request<serviceRes>({
    url: "/index/service",
    method: "GET",
  });
