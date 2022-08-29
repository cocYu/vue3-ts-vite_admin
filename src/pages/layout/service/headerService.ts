import { ElForm, FormRules } from "element-plus";
import { ref } from "vue";
import FormDrawer from "~/components/formDrawer/formDrawer.vue";
import { showModal } from "~/utils/messageBoxUtil";
import { toast } from "~/utils/notifyUtil";
import { changePasswordForm, clearChangePasswordForm } from "~/pages/layout/conf/headerConf";
import { Ref, UnwrapRef } from "@vue/reactivity";
import { LOGOUT } from "~/api/auth/auth";
import { delToken } from "~/utils/cookieUtil";
import { useUserStore } from "~/store/userStore";
import { useRouter } from "vue-router";

// 修改密码相关
interface RepasswordInterface{
    openDrawer: () => void,
    formdDrawerRef: Ref<UnwrapRef<InstanceType<typeof FormDrawer>> | null>,
    changePasswordFormRef: Ref<UnwrapRef<InstanceType<typeof ElForm>> | null>,
    submitChangePassword: () => void,
    cancleSubmit: () => void
}
export function useRepassword():RepasswordInterface{

    const formdDrawerRef = ref<InstanceType<typeof FormDrawer> | null>(null);

    const changePasswordFormRef = ref<InstanceType<typeof ElForm> | null>(null);

    const submitChangePassword = () => {
        formdDrawerRef.value.setSubmitBtnLoadingStatus(true);
        console.log("提交修改密码", changePasswordFormRef.value);
        changePasswordFormRef.value?.validate((valid) => {
            if (!valid) {
                return false;
            }
            console.log(changePasswordForm);
            //TODO: 修改密码
        });
        formdDrawerRef.value.setSubmitBtnLoadingStatus(false);
        clearChangePasswordForm();
    };

    const cancleSubmit = () => {
        formdDrawerRef.value.setCancelBtnLoadingStatus(true);
        showModal("是否确认取消修改密码?", "warning", "取消")
            .then((res) => {
                formdDrawerRef.value.close();
                toast("取消修改密码", "warning");
            })
            .finally(() => {
                clearChangePasswordForm();
                formdDrawerRef.value.setCancelBtnLoadingStatus(false);
            });
    };

    const openDrawer = () => {
        formdDrawerRef.value.open();
    }
    return {
        cancleSubmit,
        submitChangePassword,
        changePasswordFormRef,
        formdDrawerRef,
        openDrawer
    }
}

// 退出登录
interface UseLogoutInterface {
    logout: () => void
}
export function useLogout():UseLogoutInterface{
    const userStore = useUserStore();
    const router = useRouter();
    const logout = () => {
        showModal("确定要离开我么？", "warning", "退出登录").then((res) => {
            console.log("退出登录");
            LOGOUT()
                .then((res) => {
                    toast(res.data.msg || "退出登录成功");
                })
                .finally(() => {
                    delToken();
                    userStore.userInfo = {};
                    router.push("/login");
                });
        });
    };

    return {
        logout
    }
}


