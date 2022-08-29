<template>
    <div class="ymenu">
        <el-menu
            default-active="2"
            class="border-0"
            @select="select"
        >
            <template v-for="(item, index) in menus" :key="index">
                <el-sub-menu :index="index">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{item.name}}</span>
                    </template>
                    <template v-for="(child, cindex) in item.child" :key="index+ '_' + cindex">
                       <el-menu-item :index="child.frontpath">
                           <el-icon>
                               <component :is="child.icon"></component>
                           </el-icon>
                           <span>{{child.name}}</span>
                       </el-menu-item>
                    </template>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import {useMenu} from "~/pages/layout/service/asideService";

const {menus, select} = useMenu();

</script>

<style scoped>
.ymenu {
    width: 250px;
    overflow: auto;
    @apply shadow-md fixed bg-light-50;
    top: 64px;
    bottom: 0;
    left: 0;
}
</style>