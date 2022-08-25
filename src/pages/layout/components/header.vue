<template>
    <div class="y-header">
        <span class="logo font-bold">
            <el-image src="/public/vite.svg" class="mr-1"></el-image>
            Y-A
        </span>
        <el-icon class="icon-btn"><fold /></el-icon>
        <el-tooltip content="刷新" placement="bottom" effect="dark">
            <el-icon class="icon-btn" @click="handlerRefresh">
                <refresh />
            </el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center">
            <el-tooltip :content="fullScreenBtnContent" placement="bottom" effect="dark">
                <el-icon class="icon-btn" @click="handlerFullScreen">
                    <template v-if="isFullscreen">
                        <aim></aim>
                    </template>
                    <template v-else>
                        <full-screen />
                    </template>
                </el-icon>
            </el-tooltip>
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="userInfo?.avatar || ''"></el-avatar>
                    {{ userInfo.username || "" }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="repassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <el-drawer
        v-model="drawer"
        title="修改密码"
        :before-close="handleClose"
        size="45%"
        :close-on-click-modal="false"
        :show-close="false"
    >
        <el-form :model="changePasswordForm" label-width="100px" :rules="Rules" ref="changePasswordFormRef">
            <el-form-item label="旧密码" prop="oldpassword">
                <el-input type="password" v-model="changePasswordForm.oldpassword" placeholder="旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="changePasswordForm.password" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input type="password" v-model="changePasswordForm.repassword" placeholder="确认密码"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="flex">
                <el-button type="primary" @click="submitChangePassword" :loading="submitChangePasswordBtnLoading">
                    提交
                </el-button>
                <el-button type="primary" @click="cancleSubmit" :loading="cancelSubmitLoading">取消</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
import { reactive, ref } from "vue";
import { UserInfo } from "~/store/types";
import logo from "~/assets/vue.svg";

import { showModal } from "~/utils/messageBoxUtil";
import { LOGOUT } from "~/api/auth/auth";
import { toast } from "~/utils/notifyUtil";
import { delToken } from "~/utils/cookieUtil";
import { useRouter } from "vue-router";
import { useFullscreen } from "@vueuse/core";
import { Rules, changePasswordForm, clearChangePasswordForm } from "../conf/headerConf";
import { ElForm } from "element-plus";

const changePasswordFormRef = ref<InstanceType<typeof ElForm>>();

const { isFullscreen, toggle } = useFullscreen();

const userStore = useUserStore();

const userInfo = reactive<UserInfo>(userStore.userInfo);

const router = useRouter();

const fullScreenBtnContent = ref<string>("全屏");

const handlerFullScreen = () => {
    if (fullScreenBtnContent.value == "全屏") {
        fullScreenBtnContent.value = "退出全屏";
    } else {
        fullScreenBtnContent.value = "全屏";
    }
    toggle();
};

const handleCommand = (e: string | number | object) => {
    switch (e) {
        case "repassword":
            console.log("修改密码");
            drawer.value = true;
            break;
        case "logout":
            logout();
            break;
        default:
            break;
    }
};

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

/**
 * 刷新
 */
const handlerRefresh = () => {
    console.log("刷新");
    location.reload();
};

// 弹出框相关
const drawer = ref<boolean>(false);
const handleClose = (done: () => void) => {
    console.log(done);
    drawer.value = false;
};

function cancelClick() {
    drawer.value = false;
}

function confirmClick() {
    drawer.value = true;
}

const submitChangePasswordBtnLoading = ref<boolean>(false);

const submitChangePassword = () => {
    submitChangePasswordBtnLoading.value = true;
    console.log("提交修改密码", changePasswordFormRef.value);
    changePasswordFormRef.value?.validate((valid) => {
        if (!valid) {
            return false;
        }
        console.log(changePasswordForm);
    });
    submitChangePasswordBtnLoading.value = false;
    clearChangePasswordForm();
};

const cancelSubmitLoading = ref<boolean>(false);

const cancleSubmit = () => {
    cancelSubmitLoading.value = true;
    showModal("是否确认取消修改密码?", "warning", "取消")
        .then((res) => {
            drawer.value = false;
            toast("取消修改密码", "warning");
        })
        .finally(() => {
            clearChangePasswordForm();
            cancelSubmitLoading.value = false;
        });
};
</script>

<style scoped>
.y-header {
    @apply flex bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 items-center;
    height: 64px;
}
.logo {
    width: 250px;
    @apply flex flex-row justify-center items-center text-xl font-thin;
}
.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}
.y-header .dropdown {
    height: 64ppx;
    cursor: pointer;
    @apply flex items-center justify-center mx-5;
}
</style>
