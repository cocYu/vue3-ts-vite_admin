<template>
    <div class="y-header">
        <span class="logo font-bold">
            <el-image src="/public/vite.svg" class="mr-1"></el-image>
            Y-A
        </span>
        <el-icon class="icon-btn">
            <fold />
        </el-icon>
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
    <form-drawer ref="formdDrawerRef" title="修改密码" destroyOnClose @submitBtnClick="submitChangePassword"
                 @cancelClick="cancleSubmit">
        <template #body>
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
        </template>
    </form-drawer>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
import { reactive, ref } from "vue";
import { UserInfo } from "~/store/types";

import { useRouter } from "vue-router";
import { useFullscreen } from "@vueuse/core";
import { Rules, changePasswordForm, clearChangePasswordForm } from "../conf/headerConf";
import { ElForm } from "element-plus";
import { useLogout, useRepassword } from "~/pages/layout/service/headerService";
import FormDrawer from "~/components/formDrawer/formDrawer.vue";

const {
    cancleSubmit,
    submitChangePassword,
    changePasswordFormRef,
    formdDrawerRef,
    openDrawer,
} = useRepassword();

const {
    logout,
} = useLogout();

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
            formdDrawerRef.value.open();
            break;
        case "logout":
            logout();
            break;
        default:
            break;
    }
};

/**
 * 刷新
 */
const handlerRefresh = () => {
    console.log("刷新");
    location.reload();
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
    height: 64px;
    cursor: pointer;
    @apply flex items-center justify-center mx-5;
}
</style>
