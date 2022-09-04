<template>
    <div>
        <dynamic-form :form-items="config" v-model:form-model="formModel" :rules="rules" :label-width="'100px'"></dynamic-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { FormItem, FormTypeEnum } from "~/components/dynamicForm/types";
import DynamicForm from "~/components/dynamicForm/dynamicForm.vue";
import { FormRules } from "element-plus";

const config = reactive<FormItem[]>([
    {
        lable: "姓名",
        bindField: "name1",
        formType: FormTypeEnum.TEXTAREA,
        placeHolder: "请输入名称",
        options: {
            rows: 20
        }
    },
    {
        lable: "姓名2",
        bindField: "name2",
        formType: FormTypeEnum.INPUT,
        placeHolder: "请输入名称2",
    },
]);

const formModel = reactive({
    name1: "",
    name2: ""
})

const rules: FormRules = reactive<FormRules>({
    name1: [
        {message: "用户名不能为空", required: true, trigger: "blur"}
    ],
    name2: [
        {message: "用户名不能为空", required: true, trigger: "blur"}
    ]
})

</script>

<style scoped>

</style>