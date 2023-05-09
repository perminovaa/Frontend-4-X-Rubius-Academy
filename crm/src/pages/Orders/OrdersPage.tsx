import { useEffect, useState } from "react";
import { ordersDto } from "../../common/dto";
import {OrdersCard} from "./components/ordersCard";
import { ordersApi } from "../../common/api";



export function OrderPage() {
  
  

  const [orders, setOrders] = useState<ordersDto[]>([]);

  useEffect(() => {
    ordersApi.getAll().then(setOrders);
  },[]);

  const removeOrders = (ordersId: number) => {
    setOrders(orders.filter(x => x.id !== ordersId));
    //9 1:44 про асинх и бекенд
  };

  return <>
  
    <div className='EmployeeList' style={{display: 'flex'}}>


      {orders.length === 0 && <p>Нет данных</p> }

      <div className='orders'>
        {orders.map(orders =>
        <OrdersCard 
          onRemove={() => removeOrders(orders.id)} 
          key={orders.id} 
          orders={orders}
        /> )}
      </div>
    </div> </>}

