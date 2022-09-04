import { FormRules } from "element-plus";
import { BaseOptions } from "vm";

export interface LayoutConfig {
    xs: number,
    sm: number,
    md: number,
    lg: number,
    xl: number
}


export enum FormTypeEnum {
    INPUT = "input",
    PASSWORD = "password",
    TEXTAREA = "textarea",
    RADIO = "radio",
    SELECT = "select",
    SLIDER = "slider",
    SWITCH = "switch",
    CHECKBOX = "CHECKBOX"
}

export interface FormItem{
    lable: string,
    formType: FormTypeEnum,
    bindField: string,
    value?: any,
    placeHolder?: string,
    options?: Object
}
