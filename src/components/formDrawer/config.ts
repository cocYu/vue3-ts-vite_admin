import { ref } from "vue";
import FormDrawer from "~/components/formDrawer/formDrawer.vue";
import { ElForm } from "element-plus";
import { changePasswordForm, clearChangePasswordForm } from "~/pages/layout/conf/headerConf";
import { showModal } from "~/utils/messageBoxUtil";
import { toast } from "~/utils/notifyUtil";

export function useFormDrawer(){
    /**
     * 抽屉打开状态
     */
    const showDrawer = ref<boolean>(false);

    /**
     * 打开抽屉
     */
    const open = () => {
        showDrawer.value = true;
    };

    /**
     * 关闭抽屉
     */
    const close = () => {
        showDrawer.value = false;
    };

    /**
     * 抽屉按钮加载状态按钮定义
     */
    const cancelBtnIsLoading = ref<boolean>(false);
    const submitBtnIsLoading = ref<boolean>(false);

    const setCancelBtnLoadingStatus = (status: boolean) => {
        cancelBtnIsLoading.value = status;
    };

    const setSubmitBtnLoadingStatus = (status: boolean) => {
        submitBtnIsLoading.value = status;
    };
    return {
        showDrawer,
        open,
        close,
        cancelBtnIsLoading,
        submitBtnIsLoading,
        setCancelBtnLoadingStatus,
        setSubmitBtnLoadingStatus
    }
}
