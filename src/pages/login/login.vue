<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left-col">
      <div class="left-container">
        <div>欢迎光临</div>
        <div>这是 Mryu 的演示站点</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right-col">
      <div>
        <h2 class="login-title">欢迎回来</h2>
        <div class="login-tip">
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>账号密码登录</span>
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <el-form :model="form" class="w-100" :rules="rules" ref="formRef">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              round
              color="#626aef"
              type="primary"
              @click="onSubmit"
              class="w-100"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LoginForm } from "./types/types.ts";
import { User, Lock } from "@element-plus/icons-vue";
import { loginResponsive, ResponsiveConf, Rules } from "./config/loginConf.ts";
import { ElForm, FormRules } from "element-plus";

const form = reactive<LoginForm>({});

const responsiveConf = reactive<ResponsiveConf>(loginResponsive);

const rules: FormRules = reactive<FormRules>(Rules);
const formRef = ref<InstanceType<typeof ElForm>>();

const onSubmit = () => {
  formRef.value?.validate((valid) => {
    console.log("表单校验结果:", valid);
    if (!valid) {
      return false;
    }
    console.log("登录成了哈");
  });
};
</script>

<style scoped>
.login-container {
  @apply bg-indigo-500 min-h-screen;
}
.login-container .left-col,
.login-container.right-col {
  @apply flex flex-col items-center;
}

.login-container .left-col .left-container {
  height: 100%;
  width: 100%;
  @apply flex justify-center flex-col items-center;
}

.login-container .left-col .left-container > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}

.login-container .left-col .left-container > div:last-child {
  @apply text-gray-200 text-sm;
}

.right-col {
  @apply bg-light-50;
}
.right-col > div:first-child {
  width: 100%;
  height: 100%;
  @apply flex justify-center items-center flex-col;
}
.login-title {
  @apply font-bold text-3xl text-gray-800;
}
.login-tip {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
</style>
