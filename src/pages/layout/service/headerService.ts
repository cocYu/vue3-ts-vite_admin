import { ElForm, FormRules } from "element-plus";
import { ref } from "vue";
import FormDrawer from "~/components/formDrawer/formDrawer.vue";
import { showModal } from "~/utils/messageBoxUtil";
import { toast } from "~/utils/notifyUtil";
import { changePasswordForm, clearChangePasswordForm } from "~/pages/layout/conf/headerConf";
import { Ref, UnwrapRef } from "@vue/reactivity";

// 修改密码相关
interface RepasswordInterface{
    openDrawer: () => void,
    formdDrawerRef: Ref<UnwrapRef<InstanceType<typeof FormDrawer>>>,
    changePasswordFormRef: Ref<UnwrapRef<InstanceType<typeof ElForm>> | null>,
    submitChangePassword: () => void,
    cancleSubmit: () => void
}
export function useRepassword(): RepasswordInterface{

    const formdDrawerRef = ref<InstanceType<typeof FormDrawer>>(null);

    const changePasswordFormRef = ref<InstanceType<typeof ElForm>| null>(null);

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