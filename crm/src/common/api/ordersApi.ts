import { CreateOrderDto, OrderDto, UpdateOrderDto, DeleteOrderDto } from "../dto";
import { HttpService } from "../services/HttpService";

class OrderApi extends HttpService {
    constructor() {
        super('orders');
    }

    getOrder(): Promise<OrderDto[]> {
        return this.get('');
    }

    createOrder(CreateOrderDto: CreateOrderDto) {
        return this.post('', CreateOrderDto)
    }

    updateOrder(UpdateOrderDto: UpdateOrderDto) {
        return this.patch('', UpdateOrderDto.customerId, UpdateOrderDto)
    }

    deleteOrder(DeleteOrderDto: DeleteOrderDto) {
        return this.delete('', DeleteOrderDto.id)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new OrderApi();
