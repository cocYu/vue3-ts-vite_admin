<script setup lang="ts"></script>

<template>
  <!-- <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row> -->
  <button class="btn">按钮</button>
</template>

<style scoped>
.btn {
  @apply bg-purple-500 text-indigo-200 px-4 py-2 mx-4 my-4 transition-all duration-500 rounded hover:(bg-purple-900) focus:(ring-grey-4);
}
</style>
