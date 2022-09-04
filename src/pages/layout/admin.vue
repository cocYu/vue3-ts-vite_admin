<template>
    <el-container>
        <el-header>
            <YHeader></YHeader>
        </el-header>
        <el-container>
            <el-aside :width="appStore.asideWidth">
                <YAside></YAside>
            </el-aside>
            <el-main>
                <YTagList></YTagList>
                <div style="height: 44px; width: 100%"></div>
                <div class="main-content">
                    <router-view v-slot="{Component}">
                        <transition name="fade" mode="out-in">
                            <keep-alive :max="10">
                                <component :is="Component"></component>
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
// 组件引入
import YHeader from "./components/header.vue";
import YAside from "./components/aside.vue";
import YTagList from "./components/taglist.vue";
import { useAppStore } from "~/store/appStore";

const appStore = useAppStore();
</script>

<style scoped>
.el-aside {
    transition: all 0.2s;
}

:deep(.el-main) {
    padding: 4px 0;
}

.main-content {
    padding: 20px;
}

.fade-enter-from {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

.fade-leave-from {
    opacity: 1;
}

.fade-leave-to {
    opacity: 0;
}

.fade-enter-active, .fade-leave-active {
    transition: all 0.3s;
}

</style>