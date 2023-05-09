
import { ordersDto } from "../../../common/dto";
import { Button, Divider, Typography} from "antd";

const { Text } = Typography;

interface OrdersCardProps {
    orders: ordersDto;
    onRemove: () => void;
}

export function OrdersCard({ orders, onRemove } : OrdersCardProps) {


    return (
        <>
        <div style={{borderColor:'black', border:'#FF0 dashed 1px', padding: '15px', width: '300px', borderRadius: '8px', textAlign: 'center'}}>
            <Divider>Дата визита:</Divider>
            <div><Text>{orders.visitDate}</Text> </div>
            <Divider>Услуга:</Divider>
            <div><Text>{orders.service.name}</Text></div>
            <Divider>Мастер:</Divider>
            <div><Text>{orders.master.fullName}</Text></div>
            <div><Text  type="secondary">{orders.master.position}</Text></div>
            <Divider>Имя клиента:</Divider>
            <div><Text>{orders.customer.fullName}</Text></div>
            <Divider>Телефон клиента:</Divider>
            <div><Text>{orders.customer.phone}</Text></div>
            <Divider>Статус записи:</Divider>
            <div className="status">{orders.status}</div>
            <Button style={{marginTop: "15px", marginRight: "5px"}}>Редактировать</Button>
            <Button onClick={onRemove} style={{marginTop: "15px"}}>Удалить</Button>
            </div>
        </>  
    )
}