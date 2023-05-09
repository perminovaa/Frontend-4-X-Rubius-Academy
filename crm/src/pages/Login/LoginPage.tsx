import { useAuth } from "../../contexts/AuthContext";
import { AuthForm } from "./components/AuthForm";

export function LoginPage() {
    const { login } = useAuth();

    return (
        <>
            <AuthForm onLogin={login} />
        </>
    )
}