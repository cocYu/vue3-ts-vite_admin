<template>
    <el-form :label-width="labelWidth" :label-align="'right'" :model="formData" :rules="rules" ref="formRef">
        <el-row>
            <template v-for="(item, index) in formItems" :key="index">
                <el-col :xs="layoutConfig.xs" :sm="layoutConfig.sm" :md="layoutConfig.md" :lg="layoutConfig.lg" :xl="layoutConfig.xl" >
                    <el-form-item :label="item.lable" :prop="item.bindField" :label-width="labelWidth">
                        <template v-if="item.formType === FormTypeEnum.INPUT">
                            <el-input v-model="formData[`${item.bindField}`]"  :placeholder="item.placeHolder"/>
                        </template>
                        <template v-else-if="item.formType === FormTypeEnum.PASSWORD">
                            <el-input type="password" v-model="formData[`${item.bindField}`]"  :placeholder="item.placeHolder"/>
                        </template>
                        <template v-else-if="item.formType === FormTypeEnum.TEXTAREA">
                            <el-input type="textarea" :rows="item.options?.rows || 5" :placeholder="item.placeHolder" v-model="formData[`${item.bindField}`]"/>
                        </template>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>
<script lang="ts" setup>

import { FormItem, LayoutConfig, FormTypeEnum } from "~/components/dynamicForm/types";
import { ElForm, FormRules } from "element-plus";
import { reactive, ref, watch } from "vue";

const formRef = ref<InstanceType<typeof ElForm>>();

const vlidateForm = (callback: (isValid:boolean) => void) => {
    formRef.value?.validate((valid) => {callback(valid)})
}


defineExpose({
    vlidateForm
})

const props = withDefaults(defineProps<{
    layoutConfig?: LayoutConfig,
    formItems: FormItem[],
    rules?: FormRules,
    formModel: Record<string, any>,
    labelWidth: string| number,
}>(), {
    layoutConfig: () => ({
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24
    }),
    formItems: () => [],
    formModel: () => ({}),
    labelWidth: "100px",
    rules: () => ({})
})

const emits = defineEmits<{
    (e: "update:formModel", newValue:any): void
}>();


const formData = ref({...props.formModel});

watch(formData, (newVal:any) => {
    console.log("newVal", newVal)
    emits("update:formModel", newVal);
}, {
    deep: true
});

</script>

<style scoped>

</style>