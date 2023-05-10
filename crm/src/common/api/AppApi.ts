import { AuthDataDto } from "../dto";
import { HttpService } from "../services/HttpServise";

interface TokenDto {
    access_token: string;
}

class AppApi extends HttpService {
    login(data: AuthDataDto): Promise<TokenDto> {
        return this.post('login', data);
    }

    logout() {
        return this.post('logout');
    }

    refresh() {
        return this.get('refresh');
    }
}

export default new AppApi();