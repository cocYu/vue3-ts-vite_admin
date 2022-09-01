export interface Chart1{
    title: string,
    value: string | number,
    unit: string,
    unitColor: string,
    subTitle: string,
    subValue: string | number,
    subUnit: string
}

export interface ChartData<T>{
    panels: Chart1[]
}