import { employeeDto } from "../dto";
import { HttpService } from "../services/HttpServise";

class EmployeesApi extends HttpService {
    constructor() {
        super('staff');
    }

    getAll(): Promise<employeeDto[]> {
        return this.get('');
    }
}

export default new EmployeesApi();