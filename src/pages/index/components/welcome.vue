<template>
    <div class="index-welcome">
        <div>
            <el-avatar :size="64" :src="userStore.userInfo.avatar || ''" />
            <div class="welcome-title">
                <span class="text-xl">欢迎您，{{userStore.userInfo.username}}</span>
                <span class="text-sm text-gray-600 mt-2">努力是成功之母。——塞万提斯</span>
            </div>
        </div>
        <div class="welcome-right">
             <span>天气：晴</span>
             <span>温度：22℃ - 33℃</span>
             <span>靓仔，太阳很暖，但也要注意防晒喔</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();
</script>

<style scoped>
.index-welcome {
    width: 100%;
    @apply bg-white flex flex-row items-center mb-2 justify-between pt-2 pb-2 rounded;
}

.index-welcome > div:first-child{
    @apply ml-2  flex justify-between;
}
.welcome-title{
    height: 100%;
    @apply flex flex-col ml-2 justify-between;
}

.welcome-right {
    @apply flex flex-col text-xs text-gray-500 mr-5;
}

</style>