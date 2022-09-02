<template>
    <el-row :gutter="20" class="mt-5">
        <el-col :span="3" :offset="0" v-for="(item, index) in indexNavsData" :key="index">
            <el-card shadow="hover" @click="router.push(item.path)">
                <div class="flex items-center is-justify-center cursor-pointer flex-col">
                    <el-icon :size="20" color="#409EFC">
                        <component :is="item.icon"/>
                    </el-icon>
                    <span class="mt-2 text-sm">{{item.title}}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface IndexNavData {
    icon: string,
    color: string,
    title: string,
    path: string
}

const indexNavsData = reactive<IndexNavData[]>([
    {
        icon: "user",
        color: "text-green-500",
        title: "用户",
        path: "/user/list"
    },
    {
        icon: "shopping-cart",
        color: "text-green-500",
        title: "商品",
        path: "/goods/list"
    },
    {
        icon: "tickets",
        color: "text-green-500",
        title: "订单",
        path: "/order/list"
    },
    {
        icon: "chat-dot-square",
        color: "text-green-500",
        title: "评价",
        path: "/comment/list"
    },
    {
        icon: "picture",
        color: "text-green-500",
        title: "图库",
        path: "/image/list"
    },
    {
        icon: "bell",
        color: "text-green-500",
        title: "公告",
        path: "/notice/list"
    },
    {
        icon: "set-up",
        color: "text-green-500",
        title: "配置",
        path: "/setting/base"
    },
    {
        icon: "files",
        color: "text-green-500",
        title: "优惠券",
        path: "/coupon/list"
    }
])

</script>