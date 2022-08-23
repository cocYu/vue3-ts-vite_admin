<template>
  <el-row>
    <el-col :sm="24" :lg="24">
      <el-result icon="warning" title="404提示" sub-title="少年郎，迷路了喔~">
        <template #extra>
          <el-button type="primary" @click="$router.push('/')"
            >返回首页</el-button
          >
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup></script>

<style scoped></style>
