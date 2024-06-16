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
import { Skeleton } from "@components/ui/skeleton";

export interface NewPasswordData {
    password: string,
    repeatPassword: string
}

export interface NewPasswordErrors {
    password: string,
    repeatPassword: string
}


interface Props {
    validate: (data: NewPasswordData) => NewPasswordErrors | null,
    onSubmit: (data: NewPasswordData) => void
}

export default ({ validate, onSubmit }: Props) => {

    const [errors, setErrors] = useState<NewPasswordErrors | null>(null);
    const [data, setData] = useState<NewPasswordData>({ password: "", repeatPassword: "" });

    const submit = () => {
        const errors = validate(data);
        if (errors == null) {
            setErrors(null)
            onSubmit(data);
        } else {
            setErrors(errors)
        }

    }

    return (
        <Card className="max-w-[400px] max-h-[600px]">
            <Header>
                <Title> Create a new password </Title>
            </Header>
            <Content className="p-2 flex flex-col gap-2">
                <Input type="password" onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" />
                <p>{errors?.password}</p>
                <Input type="password" onChange={(e) => setData({ ...data, repeatPassword: e.target.value })} placeholder="Password confirmation" />
                <p>{errors?.repeatPassword}</p>
            </Content>
            <Footer className="flex flex-col gap">
                <Button onClick={submit} > Change password </Button>
            </Footer>
        </Card>
    )
}
