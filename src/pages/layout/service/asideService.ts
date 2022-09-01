import { reactive, ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useUserStore } from "~/store/userStore";

export function useMenu() {
    const router = useRouter();
    const userStore = useUserStore();
    const route = useRoute();

    const menus = userStore.userInfo.menus;

    const defaultActive = ref<string>(route.path);

    function select(index: any, indexPath: any, item: any) {
        console.log(index, indexPath, item);
        router.push(index);
    }
    onBeforeRouteUpdate((to, from) => {
        defaultActive.value = to.path;
    })


    return {
        menus,
        select,
        defaultActive
    };
}