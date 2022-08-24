import { ElNotification } from "element-plus";
import { EpPropFinalized, EpPropMergeType } from "element-plus/es/utils";

/**
 * 消息通知
 *
 * @param message 消息体
 * @param msgType 消息类型
 * @param dangerouslyUseHTMLString
 */
export const toast = (message:string , msgType:any = "success", dangerouslyUseHTMLString:boolean = false) => {
    ElNotification({
        message: message,
        type: msgType,
        duration: 3000,
        dangerouslyUseHTMLString: dangerouslyUseHTMLString
    })
}