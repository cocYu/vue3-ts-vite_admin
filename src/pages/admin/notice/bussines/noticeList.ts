import { reactive, ref } from "vue";
import { INoticeList } from "~/api/notice/types";
import { getNoticeList } from "~/api/notice/noticeApi";
import { PageRequest } from "~/api/CommonTypes";
import FormDrawer from "~/components/formDrawer/formDrawer.vue";
import { FormItem, FormTypeEnum } from "~/components/dynamicForm/types";
import { FormRules } from "element-plus";
import DynamicForm from "~/components/dynamicForm/dynamicForm.vue";

export function useNoticeList() {

    const params = reactive<PageRequest>({ page: 1, limit: 10 });
    const noticeData = ref<INoticeList>({ totalCount: 0, list: [] });
    const tableLoading = ref<boolean>(false);
    const formDraweRef = ref<InstanceType<typeof FormDrawer>>();

    const doGetNoticeList = () => {
        tableLoading.value = true;
        getNoticeList(params).then(res => {
            noticeData.value = res.data || { totalCount: 0, list: [] };
        }).finally(() => {
            tableLoading.value = false;
        });
    };
    doGetNoticeList();

    const handleDeleteNotice = (id: any) => {
        console.log("删除" + id + "公告");
        // 刷新公告列表
        doGetNoticeList();
    };

    const pageChange = (page: number) => {
        params.page = page;
        doGetNoticeList();
    };

    const handleRefresh = () => {
        doGetNoticeList();
    };

    const formSubmit = (form: any) => {

    }

    return {
        params,
        doGetNoticeList,
        noticeData,
        handleDeleteNotice,
        tableLoading,
        pageChange,
        handleRefresh,
        formDraweRef,
    };
}

/**
 * 动态表单配置
 *
 * @constructor
 */
export function NoticeDymicFormConfig() {

    const dynamicFormRef = ref<InstanceType<typeof DynamicForm>>();

    const formModel = ref({
        content: "",
        id: 0,
        order: 0,
        title: ""
    });

    const FormConfig = reactive<FormItem[]>([
        {
            bindField: "title",
            formType: FormTypeEnum.INPUT,
            lable: "公告标题"
        },
        {
            bindField: "content",
            formType: FormTypeEnum.TEXTAREA,
            lable: "公告内容"
        },
    ]);

    const formRules = ref<FormRules>({
        title: [
            {required: true, message: "公告标题不能为空", trigger: "blur"}
        ],
        content: [
            {required: true, message: "公告内容不能为空", trigger: "blur"}
        ]
    });


    return {
        dynamicFormRef,
        formModel,
        formRules,
        FormConfig
    }
}