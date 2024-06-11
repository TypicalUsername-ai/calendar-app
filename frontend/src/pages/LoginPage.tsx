import LoginForm, { LoginInfo, LoginErrors } from "@components/Authorization/LoginForm"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import authContext from "@/utils/authContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"


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
        if (auth.currentUser()) {
            navigate('/calendar');
        }
    }, []);

    const handleSubmit = async (data: LoginInfo) => {
        try {
            const account = await auth.login(data.email, data.password);
            toast({
                title: "Hooray!",
                description: `Logged in successfully.`
            })
        } catch (error: any) {
            toast({
                title: "Something went wrong...",
                description: error.json.msg,
                variant: 'destructive'
            })
        }

    }

    return (
        <div>
            <LoginForm validate={validate} onSubmit={handleSubmit}/>
            <Toaster />
        </div>
    )
}
