<template>
    <div class="taglist" :style="{left: appStore.asideWidth}">
        <el-tabs
            v-model="activeTab"
            type="card"
            class="flex-1"
            style="min-width: 100px"
            tab-position="top"
            @tab-change="tabActiveChange"
            @tab-remove="closeTab"
        >
            <el-tab-pane
                :closable="item.path != '/'"
                v-for="item in tabList"
                :key="item.path"
                :label="item.title"
                :name="item.path"
            >

            </el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown>
                <span>
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
</template>

<script setup lang="ts">
import { useTaglist } from "~/pages/layout/service/taglistService";
import { useAppStore } from "~/store/appStore";

const {
    tabList,
    activeTab,
    tabActiveChange,
    closeTab
} = useTaglist();
const appStore = useAppStore();

</script>

<style scoped>
.taglist {
    @apply fiexd bg-gray-100 flex items-center;
    top: 64px;
    right: 0px;
    height: 44px;
    z-index: 100;
    position: fixed;
}

:deep(.el-tabs__header) {
    margin-bottom: 0 !important;
    border: 0 !important;
    display: flex;
    align-items: center;
}

:deep(.el-tabs__nav) {
    border: 0 !important;
    display: flex !important;
    justify-content: center !important;
    height: 100% !important;
    align-items: center !important;
}

:deep(.el-tabs__item) {
    border: 0 !important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}

:deep(.el-tabs__nav-scroll) {
    border: 0 !important;
}

:deep(.el-tabs__nav-next), :deep(.el-tabs__nav-prev) {
    line-height: 32px;
    height: 32px;
}

.tag-btn {
    @apply bg-whilte rounded ml-auto flex items-center jusitify-center px-2;
    height: 32px;
}

:deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300;
}

</style>