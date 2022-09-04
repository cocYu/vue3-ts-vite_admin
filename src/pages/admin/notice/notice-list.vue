<template>
    <el-card shadow="never" class="border-0">
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small" @click="openDrawe(FormDraweTitleEnum.INSERT)">新增</el-button>
            <el-tooltip class="" effect="dark" content="刷新数据" placement="bottom">
                <el-button type="primary" text size="small" @click="handleRefresh">
                    <el-icon :size="20">
                        <refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>
        <div>
            <el-table scripe style="width: 100%" :data="noticeData.list" v-loading="tableLoading">
                <el-table-column prop="title" label="公告标题" />
                <el-table-column prop="create_time" label="发布时间" width="380" />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="primary" text size="small" @click="openDrawe(FormDraweTitleEnum.UPDATE, scope.row)">修改
                        </el-button>
                        <span @click.stop="() => {}">
                            <el-popconfirm :title="'是否确认删除' + scope.row.title + '?'" confirm-button-text="确认"
                                           cancel-button-text="取消" @confirm="handleDeleteNotice(scope.row.id)">
                                <template #reference>
                                    <el-button type="danger" text size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex justify-center items-center mt-2" style="width: 100%">
                <el-pagination background layout="prev, pager, next" :total="noticeData.totalCount"
                               :current-page="params.page" :page-size="params.limit" @current-change="pageChange" />
            </div>
        </div>
        <form-drawe ref="formDraweRef" :title="formDrawerTitle" @cancelClick="canleBtnClick" @submitBtnClick="submitChangeNotice" :destroyOnClose="true">
            <template #body>
                <dynamic-form :form-items="FormConfig" v-model:form-model="formModel" label-width="80px" :rules="formRules" ref="dynamicFormRef"></dynamic-form>
            </template>
        </form-drawe>
    </el-card>
</template>

<script lang="ts" setup>
import { NoticeDymicFormConfig, useNoticeList } from "~/pages/admin/notice/bussines/noticeList";
import FormDrawe from "~/components/formDrawer/formDrawer.vue";
import { showModal } from "~/utils/messageBoxUtil";
import { toast } from "~/utils/notifyUtil";
import { ref } from "vue";
import DynamicForm from "~/components/dynamicForm/dynamicForm.vue";
import { Notice } from "~/api/notice/types";

const {
    params,
    doGetNoticeList,
    noticeData,
    handleDeleteNotice,
    tableLoading,
    pageChange,
    handleRefresh,
    formDraweRef,
} = useNoticeList();

const {
    dynamicFormRef,
    formModel,
    formRules,
    FormConfig,
} = NoticeDymicFormConfig();

enum FormDraweTitleEnum {
    INSERT = "新增公告",
    UPDATE = "修改公告"
}

const formDrawerTitle = ref<string>();

const openDrawe = (title: FormDraweTitleEnum, notice?: Notice) => {
    formDrawerTitle.value = title;
    if (title === FormDraweTitleEnum.UPDATE){
        formModel.value = {
            id: notice!.id,
            order: 0,
            title: notice!.title,
            content: notice!.content
        }
    }else{
        cleanDynamicForm();
    }
    console.log(formModel.value, notice)
    formDraweRef.value.open();
};

const canleBtnClick = () => {
    formDraweRef.value.setCancelBtnLoadingStatus(true);
    showModal(`取消${formDrawerTitle.value}？`, "warning", "提示").then(res => {
        toast(`取消${formDrawerTitle.value}`);
        formDraweRef.value.close();
    }).finally(() => {
        formDraweRef.value.setCancelBtnLoadingStatus(false);
    });
};

const cleanDynamicForm = () => {
    formModel.value = {
        id: 0,
        title: "",
        content: "",
        order: 0
    };
}

const submitChangeNotice = () => {
    dynamicFormRef.value.vlidateForm((isValid: boolean) => {
        if (!isValid){
            return;
        }else {
            formDraweRef.value.setSubmitBtnLoadingStatus(true);
            console.log("表单校验通过")
            showModal("是否确认提交？", "warning", "提示")
                .then(res => {
                    formDraweRef.value.close();
                }).finally( () => {
                formDraweRef.value.setSubmitBtnLoadingStatus(false);
            })
        }
    })
}

</script>

<style scoped>

</style>