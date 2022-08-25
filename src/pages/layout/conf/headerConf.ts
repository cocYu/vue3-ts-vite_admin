import { ChangePasswordForm } from "./../../../api/auth/types";
import { ElForm, FormRules } from "element-plus";
import { reactive, ref } from "vue";

export const changePasswordForm = reactive<ChangePasswordForm>({
    oldpassword: "",
    password: "",
    repassword: "",
});

export const clearChangePasswordForm = () => {
    changePasswordForm.oldpassword = "";
    changePasswordForm.password = "";
    changePasswordForm.repassword = "";
};

/**
 * 自定义密码校验规则
 *
 * @param rule
 * @param value
 * @param callback
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
