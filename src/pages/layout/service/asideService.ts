import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "~/store/userStore";

export function useMenu() {
    const router = useRouter();
    const userStore = useUserStore();

    const menus = userStore.userInfo.menus;

    function select(index: any, indexPath: any, item: any) {
        console.log(index, indexPath, item);
        router.push(index);
    }


    return {
        menus,
        select
    };
}