<template>
    <el-container>
        <el-header>
            <YHeader></YHeader>
        </el-header>
        <el-container>
            <el-aside>
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
</script>

<style scoped>

</style>