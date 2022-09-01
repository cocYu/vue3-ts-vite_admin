import { statistics_1 } from "~/api/chart/chart";
import { ref } from "vue";
import { Chart1 } from "~/api/chart/types";

/**
 * 首页业务代码实现
 */
export function useIndexBussiness() {
    const panels = ref<Chart1[]>([]);

    const getChart1Data = () => {
        statistics_1().then(res => {
            console.log("chart_1 data is :", res);
            panels.value = res.data?.panels || []
        }).catch(err => {
            console.log("get chart_1 data error: ", err);
        });
    };
    getChart1Data();

    return {
        getChart1Data,
        panels
    }
}