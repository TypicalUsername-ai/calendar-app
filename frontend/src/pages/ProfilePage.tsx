import UserDataCard, { UserData } from "@components/UserDataCard"
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react"
import authContext from "@/utils/authContext";
import { useToast } from "@/components/ui/use-toast";
import { Navigate } from "react-router-dom";

export default () => {

    const auth = useContext(authContext);
    const { toast } = useToast();

    const account = useQuery({
        queryKey: ['account-data'],
        queryFn: async () => {
            const data = await auth.currentUser()?.getUserData();
            if (!data) {
                auth.currentUser()?.clearSession();
                throw new Error("No session found")
            }
            return { email: data.email, username: data.user_metadata.username } as UserData
        }
    })

    const onEdit = async (data: UserData): Promise<boolean> => {
        try {
            const user = auth.currentUser()!
            const payload: any = {};
            if (user.email != data.email) {
                payload.email = data.email
                payload.data = { email: data.email }
            } if (user.user_metadata.username != data.username) {
                payload.data = { username: data.username }
            }
            await user.update(payload)
            toast({
                title: "Account update succesful",
                description: user.email != data.email ? "Please confirm the email change on both email accounts" : null,
                variant: 'default'
            })
            return true;
        }
        catch (error) {
            toast({
                title: "An error has ocurred",
                description: "We couldn't update your account information",
                variant: 'destructive'
            })
            return false;
        }
    }

    return (
        <div>
            {account.isError ?
                <Navigate to={`/login?reason=${account.error.json.msg}`} replace={true} />
                : null}
            <UserDataCard status={account.status} userData={account.data} onEdit={(data) => onEdit(data)} />
        </div>
    )
}
