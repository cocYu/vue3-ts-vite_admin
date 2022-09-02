import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";
import { CookieEnum } from "~/constant/constant";

/**
 * 标签页相关方法
 */
export function useTaglist() {
    const route = useRoute();
    const router = useRouter();
    const cookie = useCookies();
    const tabList = ref([
        {
            title: "后台首页",
            path: "/",
        },
    ]);

    const activeTab = ref(route.path);

    // const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
    //     if (action === 'add') {
    //         const newTabName = `${++tabIndex}`
    //         editableTabs.value.push({
    //             title: 'New Tab',
    //             name: newTabName,
    //             content: 'New Tab content',
    //         })
    //         editableTabsValue.value = newTabName
    //     } else if (action === 'remove') {
    //         const tabs = editableTabs.value
    //         let activeName = editableTabsValue.value
    //         if (activeName === targetName) {
    //             tabs.forEach((tab, index) => {
    //                 if (tab.name === targetName) {
    //                     const nextTab = tabs[index + 1] || tabs[index - 1]
    //                     if (nextTab) {
    //                         activeName = nextTab.name
    //                     }
    //                 }
    //             })
    //         }
    //
    //         editableTabsValue.value = activeName
    //         editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    //     }
    // }

    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path;
        addTab({ title: to.meta.title, path: to.path });
    });

    function addTab(tab: { title: any, path: string }) {
        let hasTab = tabList.value.findIndex(t => t.path == tab.path) == -1;
        if (hasTab) {
            tabList.value.push(tab);
        }
        cookie.set(CookieEnum.TAB_LIST, tabList.value);
    }

    const tabActiveChange = (path: string) => {
        router.push(path);
        activeTab.value = path;
    };

    /**
     * 初始化标签导航栏
     */
    const initTabList = () => {
        let tabs = cookie.get(CookieEnum.TAB_LIST);
        if (typeof(tabs) === 'undefined'){
            return;
        }
        tabList.value = tabs;
    };

    /**
     * 移除标签页事件
     *
     * @param tabKey 移除的标签key
     */
    const closeTab = (tabKey: string) => {
        let activityTabKey = activeTab.value;
        let tabs = tabList.value;
        if (activityTabKey == tabKey) {
            tabs.forEach((tab, index) => {
                if (tab.path == tabKey) {
                    const nextTab = tabs[index+1] || tabs[index - 1];
                    if (nextTab){
                        activityTabKey = nextTab.path;
                    }
                }
            });
        }
        activeTab.value = activityTabKey;
        tabList.value = tabList.value.filter(tab => tab.path != tabKey);
        cookie.set(CookieEnum.TAB_LIST, tabList.value);
    };

    initTabList();

    return {
        tabList,
        activeTab,
        tabActiveChange,
        closeTab,
    };
}