<template>
    <el-drawer
        v-model="showDrawer"
        :title="title"
        :size="size"
        :close-on-click-modal="false"
        :show-close="false"
        :destroy-on-close="destroyOnClose"
    >
        <div class="form-drawer">
            <div class="body">
                <slot name="body"></slot>
            </div>
            <div class="actions">
                <el-button type="primary" @click="submitBtnClick" :loading="submitBtnIsLoading">
                    提交
                </el-button>
                <el-button type="primary" @click="cancelClick" :loading="cancelBtnIsLoading">取消</el-button>
            </div>

        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import { useFormDrawer } from "./config";

const {
    showDrawer,
    open,
    close,
    cancelBtnIsLoading,
    submitBtnIsLoading,
    setCancelBtnLoadingStatus,
    setSubmitBtnLoadingStatus
} = useFormDrawer();

// 向父组件暴露
defineExpose({
    open,
    close,
    setCancelBtnLoadingStatus,
    setSubmitBtnLoadingStatus,
    cancelBtnIsLoading,
    submitBtnIsLoading
});

type btnType = "primary"| "success" | "warning" | "danger" | "info"

interface BtnConfig {
    text?: string;
    type?: btnType;
}

interface FormDrawerProps {
    title?: string;
    size?: string;
    destroyOnClose?: boolean;
    submitBtn?: BtnConfig;
    cancelBtn?: BtnConfig;
}

const props = withDefaults(defineProps<FormDrawerProps>(), {
    title: "弹出框",
    size: "45%",
    destroyOnClose: false,
    submitBtn: () => ({
        text: "提交",
        type: "primary",
    }),
    cancelBtn: () => ({
        text: "返回",
        type: "primary"
    })
});
const emits = defineEmits<{
    (e: "submitBtnClick"): void,
    (e: "cancelClick"): void
}>();

const submitBtnClick = () => {
    emits("submitBtnClick");
}

const cancelClick = () => {
    emits("cancelClick");
}

</script>

<style scoped>
.form-drawer {
    width: 100%;
    height: 100%;

    position: relative;
    display: flex;
}

.form-drawer .body {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}

.form-drawer .actions {
    height: 50px;
    @apply mt-auto flex items-center;
}
</style>