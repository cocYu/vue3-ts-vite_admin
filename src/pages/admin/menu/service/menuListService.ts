import { GetMenuList } from "~/api/menu/menuApis";
import { ref } from "vue";
import { MenuResponse } from "~/api/menu/types";

export function useMenuList(){
    const menuList = ref<MenuResponse[]>([]);

    GetMenuList().then(res => {
        menuList.value = res.data!.list;
    })

    return {
        menuList
    }
}