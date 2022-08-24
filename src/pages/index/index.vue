<template>
    首页
    <el-button @click="setCookie">设置cookie</el-button>
    <el-button @click="getCookie">读取cookie</el-button>
    <el-button @click="delCookie">删除cookie</el-button>
    <el-button @click="logout">退出登录</el-button>
</template>

<script lang="ts" setup>
import { useCookies } from "@vueuse/integrations/useCookies";
import { showModal } from "~/utils/messageBoxUtil";
import { LOGOUT } from "~/api/auth/auth";
import { toast } from "~/utils/notifyUtil";
import { delToken } from "~/utils/cookieUtil";
import { useUserStore } from "~/store/userStore";
import { useRouter } from "vue-router";


const cookie = useCookies();
console.log(cookie);

const setCookie = () => {
    cookie.set("vue3-manager", "123456");
};

const getCookie = () => {
    cookie.get("vue3-manager");
};

const delCookie = () => {
    cookie.remove("vue3-manager");
};
const userStore = useUserStore();
const router = useRouter();
const logout = () => {
    showModal("确定要离开我么？", "warning", "退出登录")
        .then(res => {
            console.log("退出登录");
            LOGOUT()
                .then(res => {
                    toast(res.data.msg || "退出登录成功")
                })
                .finally(() => {
                   delToken();
                   userStore.userInfo = {};
                   router.push("/login")
                });
        });
};

</script>

<style scoped></style>
