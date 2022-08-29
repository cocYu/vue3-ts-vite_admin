import { ref } from "vue";
import FormDrawer from "~/components/formDrawer/formDrawer.vue";
import { ElForm } from "element-plus";
import { changePasswordForm, clearChangePasswordForm } from "~/pages/layout/conf/headerConf";
import { showModal } from "~/utils/messageBoxUtil";
import { toast } from "~/utils/notifyUtil";

/**
 * 抽屉打开状态
 */
export const showDrawer = ref<boolean>(false);

/**
 * 打开抽屉
 */
export const open = () => {
    showDrawer.value = true;
};

/**
 * 关闭抽屉
 */
export const close = () => {
    showDrawer.value = false;
};

/**
 * 抽屉按钮加载状态按钮定义
 */
export const cancelBtnIsLoading = ref<boolean>(false);
export const submitBtnIsLoading = ref<boolean>(false);

export const setCancelBtnLoadingStatus = (status: boolean) => {
    cancelBtnIsLoading.value = status;
};

export const setSubmitBtnLoadingStatus = (status: boolean) => {
    submitBtnIsLoading.value = status;
};
