<template>
    <div class="index">
        <el-row :gutter="20">
            <template  v-if="panels.length == 0">
                <template v-for="i in 4" :key="i">
                    <el-col :span="6" :offset="0">
                        <el-skeleton style="width: 100%" animated loading>
                            <template #template>
                                <el-card shadow="hover" class="border-0 ">
                                    <template #header>
                                        <div class="flex justify-between">
                                            <el-skeleton-item variant="text" style="width: 50%" />
                                            <el-skeleton-item variant="text" style="width: 10%" />
                                        </div>
                                    </template>
                                    <el-skeleton-item variant="h3" style="width: 80%" />
                                    <el-divider></el-divider>
                                    <div class="flex justify-between text-sm text-gray-500">
                                        <el-skeleton-item variant="text" style="width: 50%" />
                                        <el-skeleton-item variant="text" style="width: 10%" />
                                    </div>
                                </el-card>
                            </template>
                        </el-skeleton>
                    </el-col>
                </template>
            </template>

            <template v-else>
                <template v-for="(item, index) in panels" :key="index">
                    <el-col :span="6" :offset="0">
                        <el-card shadow="hover" class="border-0 ">
                            <template #header>
                                <div class="flex justify-between">
                                    <span class="text-sm">{{ item.title }}</span>
                                    <el-tag :type="item.unitColor" effect="plain">
                                        {{ item.unit }}
                                    </el-tag>
                                </div>
                            </template>
                            <span class="text-3xl font-bold text-gray-500 ">
                                <count-to :val="item.value"/>
                            </span>
                            <el-divider></el-divider>
                            <div class="flex justify-between text-sm text-gray-500">
                                <span>{{ item.subTitle }}</span>
                                <span>{{ item.subValue }}</span>
                            </div>
                        </el-card>
                    </el-col>
                </template>
            </template>

        </el-row>
    </div>
</template>

<script lang="ts" setup>
import countTo from "~/components/countTo/countTo.vue"

import { useIndexBussiness } from "~/pages/index/bussiness";
import CountTo from "~/components/countTo/countTo.vue";

const { getChart1Data, panels } = useIndexBussiness();

</script>

<style scoped></style>
