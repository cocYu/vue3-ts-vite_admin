import { FormRules } from "element-plus";
export interface ResponsiveConf {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export const loginResponsive: ResponsiveConf = {
  lg: 16,
  md: 12,
};

/**
 * 表单校验规则配置
 */
export const Rules: FormRules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
};
