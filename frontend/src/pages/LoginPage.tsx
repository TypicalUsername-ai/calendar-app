import LoginForm, { LoginInfo, LoginErrors } from "@components/Authorization/LoginForm"
import { useToast } from "@/components/ui/use-toast"
import authContext from "@/utils/authContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const validate = (data: LoginInfo) => {
    var errors: LoginErrors = { emailError: null, passwordError: null }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
        errors.emailError = "Invalid email format"
    }

    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>_])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>_]{8,}$/
    if (!passwordRegex.test(data.password)) {
        errors.passwordError = "Invalid password"
    }

    // Return errors if any
    if (errors.emailError || errors.passwordError) {
        return errors
    }

    return null
}

export default () => {

    const auth = useContext(authContext);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        auth.currentUser()?.getUserData().then(
            _ => navigate('/calendar')
        ).catch(
            e => {
                toast({
                    title: "Could not autologin",
                    description: JSON.stringify(e),
                    variant: 'destructive'
                })
                auth.currentUser()?.clearSession();
            }
        )
    }, []);

    const handleSubmit = async (data: LoginInfo) => {
        try {
            const response = await axios.post('http://localhost:9999/token?grant_type=password', { email: data.email, password: data.password });
            auth.createUser(response.data, true);
            toast({
                title: "Hooray!",
                description: `Logged in successfully.`
            })
            navigate('/calendar');
        } catch (error: any) {
            console.error(error)
            toast({
                title: "Something went wrong...",
                description: error.json.msg,
                variant: 'destructive'
            })
        }

    }

    const handleRemind = async () => {
        console.warn("reminding")
    }

    return (
        <div>
            <LoginForm
                validate={validate}
                onSubmit={handleSubmit}
                onRegister={() => navigate('/signup')}
                onForgot={handleRemind}
            />
        </div>
    )
}
