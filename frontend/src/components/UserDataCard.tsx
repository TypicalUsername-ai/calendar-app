import {
    Card,
    CardContent as Content,
    CardDescription as Description,
    CardFooter as Footer,
    CardHeader as Header,
    CardTitle as Title,
} from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Switch } from "@components/ui/switch"
import { Label } from "@components/ui/label"
import { Button } from "@components/ui/button";
import { useState } from 'react'
import { Skeleton } from "./ui/skeleton";

export interface UserData {
    username: string,
    email: string,
}

interface Props {
    status: 'success' | 'error' | 'pending'
    userData: UserData | undefined,
    onEdit: (data: UserData) => Promise<boolean>
}

export default ({ userData, onEdit }: Props) => {

    const [edit, toggleEdit] = useState(false);

    return (
        <Card className="w-64">
            <Header>
                <Title> Account Data
                </Title>
                <Description className="flex-flex-row">
                    Your profile info, all in one place
                </Description>
            </Header>
            <Content>

                {edit && userData ?
                    <AccountEditForm initialData={userData} onEdit={onEdit} onAbort={() => toggleEdit(!edit)} />
                    :
                    <div>
                        <AccountData data={userData} />
                        <Button variant='outline' onClick={_ => toggleEdit(!edit)}> edit </Button>
                    </div>
                }
            </Content>
            <Footer>
                a footer !!
            </Footer>
        </Card>
    )
}

const AccountEditForm = ({ initialData, onEdit, onAbort }: { initialData: UserData, onEdit: (data: UserData) => Promise<boolean>, onAbort: () => void }) => {
    const [data, setData] = useState(initialData);
    const submit = async () => {
        if (await onEdit(data)) {
            onAbort();
        }
    }
    return (
        <div className="flex flex-col gap-2" >
            <Label htmlFor="username"> username </Label>
            <Input id="username" type='text' placeholder={initialData.username} onChange={e => setData({ ...initialData, username: e.target.value })} />

            <Label htmlFor="email"> e-mail </Label>
            <Input id="email" type='email' placeholder={initialData.email} onChange={e => setData({ ...initialData, email: e.target.value })} onInvalid={_ => alert('invalid input')} />
            <div className="flex flex-row gap-2">
                <Button variant='destructive' onClick={onAbort}> cancel </Button>
                <Button onClick={_ => submit()}> Submit </Button>
            </div>
        </div >
    )
}

const AccountData = ({ data }: { data: UserData | undefined }) => {
    return (
        <div>
            <Label htmlFor="username"> username </Label>
            {data ? <p id="username" className="p-2 border rounded-md"> {data.username} </p> : <Skeleton className="h-12 w-full" />}
            <Label htmlFor="email"> e-mail </Label>
            {data ? <p id="email" className="p-2 border rounded-md"> {data.email} </p> : <Skeleton className="h-12 w-full" />}
        </div>
    )
}
