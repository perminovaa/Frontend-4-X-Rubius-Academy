import { useState, useEffect } from 'react';
import { Button, DatePicker, DatePickerProps, Form, Input, Select,Typography } from "antd";
import { CreateOrderDto, employeeDto, OrderDto, ServicesDto } from "../../../common/dto";
import { EmpoyeesApi, ordersApi, ServicesApi } from '../../../common/api';

const { Title } = Typography;

interface CreateOrderProps {
    addOrder: (order: OrderDto) => void;
}

const CreateOrder = ({ addOrder }: CreateOrderProps) => {
    const [createOrder, setCreateOrder] = useState(false);

    const [services, setServices] = useState<ServicesDto[]>([]);
    const [masters, setMasters] = useState<employeeDto[]>([]);

    const [form] = Form.useForm();
    const [formData, setFormData] = useState<CreateOrderDto>({
        name: '',
        phone: '',
        masterId: 1,
        serviceId: 1,
        visitDate: '',
    });

    useEffect(() => {
        ServicesApi.getServices().then(setServices);
        EmpoyeesApi.getAll().then(setMasters);
    }, []);

    const handleFormSubmit = () => {
        ordersApi.createOrder(formData)
            .then((response) => {
                addOrder(response);
            })

        setCreateOrder(false);
        onReset();
    }

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        return setFormData({ ...formData, visitDate: dateString });
    };

    const onReset = () => {
        form.resetFields();
    };

    return (<>
            <Form form={form}
                autoComplete="off"
                onFinish={handleFormSubmit}
                style={{width: '700px', paddingLeft: '300px'}}
            >
                <Title level={3} style={{marginTop: "0"}}>Добавить заявку</Title>
                <Form.Item name="name"  rules={[{ required: true, message: 'Введите Имя клиента' }]}>
                    <Input size={"large"} placeholder='Имя клиента'  value={formData.name} onChange={event => setFormData({ ...formData, name: event.target.value })} />
                </Form.Item>

                <Form.Item name="phone"  rules={[{ required: true, message: 'Введите номер телефона клиента' }]}>
                    <Input size={"large"} placeholder='Телефон клиента' value={formData.phone} onChange={event => { setFormData({ ...formData, phone: event.target.value }) }} />
                </Form.Item>

                <Form.Item name="masterId" label="Мастер" rules={[{ required: true, message: 'Выберите мастера' }]}>
                    <Select size={"large"} value={formData.masterId} onChange={value => { setFormData({ ...formData, masterId: value }) }}>
                        {masters.map((master) => (
                            <Select.Option key={master.id} value={master.id}>
                                {master.fullName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="serviceId" label="Услуга" rules={[{ required: true, message: 'Выберите услугу' }]}>
                    <Select size={"large"} value={formData.serviceId} onChange={value => { setFormData({ ...formData, serviceId: value }) }}>
                    {services.map((service) => (
                            <Select.Option key={service.id} value={service.id}>
                                {service.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="visitDate" label="Дата визита" rules={[{ required: true, message: 'Введите дату визита' }]}>
                    <DatePicker onChange={onChangeDate} />
                </Form.Item>
                <div>
                    <Button type="primary" htmlType="submit" >
                        Создать
                    </Button>
                </div>
            </Form>
    </>)
}

export default CreateOrder