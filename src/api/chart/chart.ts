import { DefaultResponseResult } from "~/api/CommonTypes";
import { Chart1, ChartData } from "~/api/chart/types";
import requestClient from "~/utils/axios/axios";

export enum ChartApiEnum {
    STATISTICS_1 = "/admin/statistics1"
}

export function statistics_1():Promise<DefaultResponseResult<ChartData<Chart1>>> {
    return requestClient.get<DefaultResponseResult<ChartData<Chart1>>>({
        url: ChartApiEnum.STATISTICS_1
    });
}