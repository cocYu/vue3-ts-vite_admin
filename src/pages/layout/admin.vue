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
                <router-view/>
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
.el-aside{
    transition: all 0.2s;
}
:deep(.el-main){
    padding: 4px 0;
}
</style>