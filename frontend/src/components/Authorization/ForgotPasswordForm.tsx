import {
    Card,
    CardContent as Content,
    CardDescription as Description,
    CardFooter as Footer,
    CardHeader as Header,
    CardTitle as Title,
} from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"

interface Props {
    onSubmit: (email: string) => void
}

export default ({ onSubmit }: Props) => {

    const [email, setEmail] = useState('')

    return (
        <Card>
            <Header>
                <Title> Forgot your password? </Title>
                <Description> Don't worry, give as your email and we'll send you a message. </Description>
            </Header>
            <Content>
                <Label htmlFor="email"> E-Mail </Label>
                <Input id="email" type="email" placeholder={"your email"} onChange={e => setEmail(e.target.value)} />
            </Content>
            <Footer>
                <Button onClick={() => onSubmit(email)} > Send email </Button>
            </Footer>
        </Card>
    )
}

