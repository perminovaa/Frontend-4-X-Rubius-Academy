import { FormEventHandler, useState, useRef} from "react";
import { AuthDataDto } from "../../../common/dto";
import { Button, Divider, Input, Typography  } from "antd";

const { Title } = Typography;

interface AuthFormProps {
    onLogin: (authData: AuthDataDto) => void;
}

export function AuthForm(props: AuthFormProps) {
    const form = useRef<any>();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: FormEventHandler<HTMLFormElement> | any): void => {
        event.preventDefault();
        props.onLogin({ userName, password });
        
        reset();
    };

    const reset = () => {
        setUserName('');
        setPassword('');
    };

    return (
        <>
            <form ref={form} onSubmit={handleSubmit} className="loginForm" >
                <Divider style={{ marginTop: '-20px', marginBottom: '25px'}}><Title level={3}style={{color:"darkslateblue"}}>Авторизация</Title></Divider>

                <label>
                    <Divider>Имя пользователя</Divider>
                    <Input id="name" className='imput' type="text" required value={userName} onChange={event => setUserName(event.target.value)} />
                </label>

                <label>
                    <Divider>Пароль</Divider>
                    <Input id="name" className='imput' type="password" required value={password} onChange={event => setPassword(event.target.value)} />
                </label>

                <Button type="primary" htmlType="submit" style={{ width: '300px', marginTop: '40px', height: '40px' }}>Вход</Button>
            </form>
        </>
    )
}