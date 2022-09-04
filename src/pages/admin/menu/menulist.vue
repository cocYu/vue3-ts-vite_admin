<template>
    <div class="menu-list">
        <el-card shadow="never" class="border-0">
            <el-table :data="menuList" row-key="id" border :tree-props="{children: 'child'}">
                <el-table-column prop="name" label="name" width="auto"/>
                <el-table-column prop="menu" label="menu" width="80" align="center">
                    <template #default="scope">
                        <el-tag v-if="scope.row.menu == 1">菜单</el-tag>
                        <el-tag v-else type="success">权限</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="icon" label="图标" width="70" align="center">
                    <template #default="scope">
                        <el-icon v-if="scope.row.icon" :size="20">
                            <component :is="scope.row.icon"/>
                        </el-icon>
                    </template>
                </el-table-column>
                <el-table-column prop="frontpath" label="frontpath" width="auto"/>
                <el-table-column prop="status" label="状态" width="80" align="center">
                    <template #default="scope">
                        <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"/>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="auto" align="center">
                    <template #default="scope">
                        <el-button text type="primary">修改</el-button>
                        <el-button v-if="scope.row.menu === 1 && !scope.row.frontpath" text type="primary">添加子菜单</el-button>
                        <el-button v-else-if="scope.row.menu === 1 && scope.row.frontpath" text type="primary">添加权限</el-button>
                        <el-button text type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { useMenuList } from "~/pages/admin/menu/service/menuListService";

const {menuList} = useMenuList();
console.log(menuList)
</script>

<style scoped>

</style>