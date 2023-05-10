import { ServicesDto } from "../dto";
import { HttpService } from "../services/HttpService";

class ServicesApi extends HttpService {
    constructor() {
        super('services');
    }
    getServices(): Promise<ServicesDto[]> {
        return this.get('');
    }
}

export default new ServicesApi();
