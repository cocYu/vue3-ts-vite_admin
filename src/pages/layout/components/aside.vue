<template>
    <div class="ymenu" :style="{width: appStore.asideWidth }">
        <el-menu
            :default-active="defaultActive"
            class="border-0"
            @select="select"
            :collapse="isCollapse"
            :collapse-transition="false"
            unique-opened
        >
            <template v-for="(item, index) in menus" :key="index">
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="index.toString()">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{item.name}}</span>
                    </template>
                    <template v-for="(child, cindex) in item.child" :key="cindex">
                       <el-menu-item :index="child.frontpath">
                           <el-icon>
                               <component :is="child.icon"></component>
                           </el-icon>
                           <span>{{child.name}}</span>
                       </el-menu-item>
                    </template>
                </el-sub-menu>
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{item.name}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import {useMenu} from "~/pages/layout/service/asideService";
import { useAppStore } from "~/store/appStore";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const {menus, select, defaultActive} = useMenu();

const appStore = useAppStore();


const isCollapse = computed(() => !(appStore.asideWidth === "250px"))

</script>

<style scoped>
.ymenu {
    transition:  all 0.2s;
    overflow-y: auto;
    overflow-x: hidden;
    @apply shadow-md fixed bg-light-50;
    top: 64px;
    bottom: 0;
    left: 0;
}
.el-menu{
    border-right: none!important;
}
</style>