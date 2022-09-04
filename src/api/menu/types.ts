export type MenuResponse = {
    id: number,
    rule_id: number,
    status: number,
    create_time: string,
    update_time: string,
    name: string,
    desc: string,
    frontpath: string,
    condition: string,
    menu: number,
    order: number,
    icon: string,
    method: string,
    child: MenuResponse[]
}

export type MenuListApiRes = {
    list: MenuResponse[],
    totalCount: number,
    rules: any[]
}