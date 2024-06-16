import ForgotPasswordForm from "@/components/Authorization/ForgotPasswordForm"
import { useToast } from "@/components/ui/use-toast"
import authContext from "@/utils/authContext"
import { useContext } from "react"



export default () => {

    const auth = useContext(authContext)
    const { toast } = useToast()

    const handleSubmit = (email: string) => {
        auth.requestPasswordRecovery(email).then(
            _ => toast({
                title: "E-Mail sent",
                description: "please check your inbox"
            })
        ).catch(
            error => toast({
                title: "An error ocurred",
                description: error.json.msg,
                variant: 'destructive'
            })
        )
    }

    return (
        <ForgotPasswordForm onSubmit={handleSubmit} />
    )
}
