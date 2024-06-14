import UserDataCard, { UserData } from "@components/UserDataCard"
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react"
import authContext from "@/utils/authContext";
import { useToast } from "@/components/ui/use-toast";

export default () => {

    const auth = useContext(authContext);
    const { toast } = useToast();

    const account = useQuery({
        queryKey: ['account-data'],
        queryFn: async () => {
            const data = await auth.currentUser()?.getUserData();
            return { email: data?.email, username: data?.user_metadata.username } as UserData
        }
    })

    const onEdit = async (data: UserData): Promise<boolean> => {
        try {
            throw new Error();
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
            <UserDataCard status={account.status} userData={account.data} onEdit={onEdit} />
        </div>
    )
}
