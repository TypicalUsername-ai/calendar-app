import {
    Card,
    CardContent as Content,
    CardDescription as Description,
    CardFooter as Footer,
    CardHeader as Header,
    CardTitle as Title,
} from "@components/ui/card"
import { useState } from "react"
import { Input } from '@components/ui/input'
import { Button } from "@components/ui/button";

export interface RegisterInfo {
    email: string,
    password: string,
    passwordConfirmation: string,
    username: string
}

export interface RegisterErrors {
    emailError: string | null,
    passwordError: string | null,
    passwordConfirmationError: string | null,
    usernameError: string | null
}

interface Props {
    validate: (data: RegisterInfo) => RegisterErrors | null,
    onSubmit: (data: RegisterInfo) => void
}


export default ({ validate, onSubmit }: Props) => {
    const [data, setData] = useState<RegisterInfo>({ email: "", password: "", passwordConfirmation: "", username: "" })
    const [errors, setErrors] = useState<RegisterErrors | null>(null)

    const handleSubmit = () => {
        const errors = validate(data);
        if (!errors) {
            onSubmit(data);
        } else {
            setErrors(errors);
        }

    }

    return (
        <Card className="max-w-[400px] max-h-[600px]">
            <Header>
                <Title> Welcome! </Title>
                <Description> please input your data </Description>
            </Header>
            <Content className="p-2 flex flex-col gap-2">
                <Input onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" />
                <p>{errors?.emailError}</p>
                <Input type="password" onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" />
                <p>{errors?.passwordError}</p>
                <Input type="password" onChange={(e) => setData({ ...data, passwordConfirmation: e.target.value })} placeholder="Password confirmation" />
                <p>{errors?.passwordConfirmationError}</p>
                <Input onChange={(e) => setData({ ...data, username: e.target.value })} placeholder="Username" />
                <p>{errors?.usernameError}</p>
            </Content>
            <Footer className="flex flex-col gap">
                <Button onClick={handleSubmit} > Register </Button>
                <Button variant="link"> already have an account? </Button>
            </Footer>
        </Card>
    )
}
