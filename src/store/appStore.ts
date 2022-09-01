import { defineStore } from "pinia";
import { AppStoreAction, AppStoreState } from "~/store/types";

export const useAppStore = defineStore<string, AppStoreState, any, AppStoreAction>("appStore", {
   state: () => ({
       asideWidth: "250px"
   }),
    getters: {

    },
    actions: {
       handleAsideWidth(){
           this.asideWidth = this.asideWidth === "250px" ? "64px" : "250px";
       }
    }
});