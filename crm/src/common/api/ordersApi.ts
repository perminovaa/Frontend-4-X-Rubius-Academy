import { ordersDto } from "../dto";
import { HttpService } from "../services/HttpServise";

class ordersApi extends HttpService {
    constructor() {
        super('orders');
    }

    getAll(): Promise<ordersDto[]> {
        return this.get('');
    }
}

export default new ordersApi();