import NewPasswordForm, { NewPasswordData } from "@/components/Authorization/NewPasswordForm"
import { useToast } from "@/components/ui/use-toast";
import authContext from "@/utils/authContext"
import { AxiosError } from "axios";
import { useContext } from "react"
import { useNavigate } from "react-router-dom";

export default () => {

    const auth = useContext(authContext);
    const navigate = useNavigate()
    const { toast } = useToast()

    const validate = (data: NewPasswordData) => {
        const errors: any = {}
        // Password validation
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>_])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>_]{8,}$/
        if (!passwordRegex.test(data.password)) {
            errors.passwordError = "Invalid password"
        }

        // Password and confirmation match
        if (data.password !== data.repeatPassword) {
            errors.passwordConfirmationError = "Passwords do not match"
        }// Return errors if any
        if (errors.emailError || errors.passwordError || errors.passwordConfirmationError || errors.usernameError) {
            return errors
        }

        return null

    }
    const setPassword = async (data: NewPasswordData) => {
        try {
            const user = auth.currentUser()!;
            const res = await user.update({ password: data.password })
            console.log(res)
            toast({
                title: "Password change succesful",
                description: "please login again"
            });
            await user.logout();
            navigate("/login")
        } catch (error: any) {
            toast({
                title: "Password update unsuccesful",
                description: error.json.msg,
                variant: 'destructive'
            })
        }
    }

    return (
        <NewPasswordForm validate={validate} onSubmit={setPassword} />
    )
}
