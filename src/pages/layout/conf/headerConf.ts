import { ChangePasswordForm } from "./../../../api/auth/types";
import { ElForm, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import FormDrawer from "~/components/formDrawer/formDrawer.vue";
import { showModal } from "~/utils/messageBoxUtil";
import { toast } from "~/utils/notifyUtil";

/**
 * 修改密码表单
 */
export const changePasswordForm = reactive<ChangePasswordForm>({
    oldpassword: "",
    password: "",
    repassword: "",
});

/**
 * 清空修改密码表单值
 */
export const clearChangePasswordForm = () => {
    changePasswordForm.oldpassword = "";
    changePasswordForm.password = "";
    changePasswordForm.repassword = "";
};

/**
 * 自定义密码校验规则
 *
 * @param rule 校验规则
 * @param value 要校验的值
 * @param callback 回调函数
 */
export const checkPassword = (rule: any, value: any, callback: any) => {
    if (value != changePasswordForm.password) {
        callback(new Error("两次输入的密码不一致"));
    } else {
        callback();
    }
};

/**
 * 修改密码表单校验规则配置
 */
export const Rules: FormRules = {
    oldpassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
    password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
    repassword: [
        { required: true, message: "确认密码不能为空", trigger: "blur" },
        { validator: checkPassword, trigger: "blur" },
    ],
};

