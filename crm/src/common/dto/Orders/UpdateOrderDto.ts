export interface UpdateOrderDto {
    customerId: number,
    masterId: number,
    serviceId: number,
    visitDate: string,
    status: RecordStatusFinish,
    finishStatus: RecordStatus
}
export enum RecordStatusFinish {
    Success = 'Success',
    Failed = 'Failed'
}

export enum RecordStatus {
    Opened = 'Opened',
    Closed = 'Closed'
}

