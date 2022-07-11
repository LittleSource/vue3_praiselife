import { defineStore } from "pinia";
export const useUserStore = defineStore(
  // 唯一ID
  "user",
  {
    state: () => ({
      id: "",
      userName: "yuange",
    }),
    getters: {},
    actions: {
      setUserName(userName: string) {
        this.$state.userName = userName;
      },
    },
  }
);
