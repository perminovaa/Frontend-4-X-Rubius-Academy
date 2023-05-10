import { useState, useEffect } from "react"
import { Dispatch, SetStateAction } from "react";
import { Button, DatePicker, Form, Modal, Select } from "antd";
import { employeeDto, OrderDto, ServicesDto, UpdateOrderDto } from "../../../common/dto";
import dayjs, { Dayjs } from "dayjs";
import { EmpoyeesApi, ordersApi, ServicesApi } from "../../../common/api";

interface EditOrderProps {
    editOrder: boolean;
    setEditOrder: Dispatch<SetStateAction<boolean>>;
    editingOrder: UpdateOrderDto;
    setEditingOrder: Dispatch<SetStateAction<UpdateOrderDto>>;
    updateOrder: (updateOrders: UpdateOrderDto) => void;
    updateVisitDate: (value: Dayjs | null, dateString: string) => void;
}

const EditOrder = (props: EditOrderProps) => {
    const { editOrder, setEditOrder, updateOrder, editingOrder, setEditingOrder, updateVisitDate, } = props;

    const [, setOrders] = useState<OrderDto[]>([]);
    const [services, setServices] = useState<ServicesDto[]>([]);
    const [masters, setMasters] = useState<employeeDto[]>([]);

    useEffect(() => {
        ordersApi.getOrder().then(setOrders);
        ServicesApi.getServices().then(setServices);
        EmpoyeesApi.getAll().then(setMasters);
    }, []);

    const fields = [
        { "name": ["masterId"], "value": editingOrder.masterId },
        { "name": ["serviceId"], "value": editingOrder.serviceId },
        { "name": ["visitDate"], "value": editingOrder.visitDate ? dayjs(editingOrder.visitDate) : null, },
        { "name": ["status"], "value": editingOrder.status },
        { "name": ["finishStatus"], "value": editingOrder.finishStatus },
    ]

    return (
        <Modal
            title="Редактирование заявки"
            open={editOrder}
            onCancel={() => setEditOrder(false)}
            footer={[]}>

            <Form
                autoComplete="off"
                onFinish={updateOrder}
                fields={fields}
            >

                <Form.Item name="masterId" label="Мастер" rules={[{ required: true, message: 'Выберите мастера' }]}>
                    <Select onChange={(value) => setEditingOrder({ ...editingOrder, masterId: value })}>
                        {masters.map((master) => (
                            <Select.Option key={master.id} value={master.id}  >
                                {master.fullName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="serviceId" label="Услуга" rules={[{ required: true, message: 'Выберите услугу' }]}>
                    <Select onChange={(value) => setEditingOrder({ ...editingOrder, serviceId: value })}>
                        {services.map((service) => (
                            <Select.Option key={service.id} value={service.id}>
                                {service.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="visitDate" label="Дата визита" rules={[{ required: true, message: 'Введите дату визита' }]}>
                    <DatePicker onChange={updateVisitDate} />
                </Form.Item>

                <Form.Item name="status" label="Статус"  >
                    <Select onChange={(value) => setEditingOrder({ ...editingOrder, status: value })}>
                        <Select.Option key="Opened">
                            Opened
                        </Select.Option>
                        <Select.Option key="Closed">
                            Closed
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="finishStatus" label="Заявка"  >
                    <Select onChange={(value) => setEditingOrder({ ...editingOrder, finishStatus: value })}>
                        <Select.Option value="Failed" key="Failed">
                            Failed
                        </Select.Option>
                        <Select.Option value="Success" key="Success">
                            Success
                        </Select.Option>
                    </Select>
                </Form.Item>

                <div className='create-order__button-wraper'>
                    <Button key="cancel" onClick={() => {
                        setEditOrder(false);
                    }}>Отмена
                    </Button>
                    <Button key="edit" type="primary" htmlType="submit" >
                        Подствердить изменения
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default EditOrder