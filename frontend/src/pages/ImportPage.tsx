import FileViewCard from "@/components/Calendar/FileViewCard"
import { useToast } from "@/components/ui/use-toast"
import { addEvent } from "@/functions/calendar"
import authContext from "@/utils/authContext"
import axiosContext from "@/utils/axiosContext"
import FileImportCard from "@components/Calendar/FileImportCard"
import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"

export default () => {

    const [files, setFiles] = useState<File[]>([])
    const { toast } = useToast();
    const axios = useContext(axiosContext);
    const auth = useContext(authContext);

    const token = useQuery({
        queryKey: ['token'],
        queryFn: async () => {
            const data = await auth.currentUser()?.jwt();
            return data
        }
    })
    const session = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const user = auth.currentUser();
            if (user == null) {
                throw new Error("no current user")
            }
            const data = await user.getUserData();
            return data
        }
    })
    const handleEventAddition = async (
        axios: any,
        auth: any,
        data: any[],
        session: any
    ) => {
        try {
            for (const e of data) {
                addEvent(axios, auth, e, session);
            }
            toast({
                title: "Hooray!",
                description: `Event added successfully.`
            })
        } catch (error: any) {
            toast({
                title: "Something went wrong...",
                description: error.json?.msg || error.response?.data.error_description,
                variant: 'destructive'
            })
        }
    }
    return (
        <div>
            <FileImportCard onFileUpload={(files) => setFiles(files)} />
            {files.map(
                file => <FileViewCard key={file.name + file.size} calendarFile={file} onAdd={data => handleEventAddition(axios, token, data, session)} />
            )}
        </div>
    )
}
