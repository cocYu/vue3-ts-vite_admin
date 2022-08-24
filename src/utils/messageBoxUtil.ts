import { ElMessageBox } from "element-plus";

export function showModal(content: string = "提示内容", type:any="warning", title:string = ""){
    return ElMessageBox.confirm(content, title, {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type
    })
}