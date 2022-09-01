<template>
    {{countToConfig.num.toFixed(2).endsWith(".00") ? countToConfig.num : countToConfig.num.toFixed(2)}}
</template>

<script lang="ts" setup>
import { reactive, watch, withDefaults } from "vue";
import gsap from "gsap";

const props = withDefaults(defineProps<{
    val: number
}>(), {
    val: 0
})

const countToConfig = reactive({
    num: 0
})

function animateToVal(){
    gsap.to(countToConfig, {
        duration:  0.5,
        num: props.val
    });
}

animateToVal();

watch(() => props.val, () => animateToVal())
</script>

<style scoped>

</style>