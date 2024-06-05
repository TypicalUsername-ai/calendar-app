import {
    Card,
    CardContent as Content,
    CardDescription as Description,
    CardFooter as Footer,
    CardHeader as Header,
    CardTitle as Title,
} from "@components/ui/card"
import { useContext, useState } from "react"
import { Input } from '@components/ui/input'
import { Button } from "@components/ui/button";

interface LoginInfo {
    email: String,
    password: String
}

interface LoginErrors {
    emailError: String | null,
    passwordError: String | null
}

interface Props {
    validate: (data: LoginInfo) => LoginErrors | null,
    onSubmit: (data: LoginInfo) => void
}


export default ({ validate, onSubmit }: Props) => {

    const [data, setData] = useState<LoginInfo>({ email: "", password: "" })
    const [errors, setErrors] = useState<LoginErrors>()

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
                <Title> Welcome Back </Title>
                <Description> please input your data </Description>
            </Header>
            <Content className="p-2 flex flex-col gap-2">
                <Input onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" />
                <p>{errors?.emailError}</p>
                <Input onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" />
                <p>{errors?.passwordError}</p>
            </Content>
            <Footer className="flex flex-col gap">
                <Button onClick={handleSubmit} > Login </Button>
                <Button variant="link"> already have an account? </Button>
            </Footer>
        </Card>
    )
}
