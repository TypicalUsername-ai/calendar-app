import authContext from "@/utils/authContext";
import {
    Card,
    CardContent as Content,
    CardDescription as Description,
    CardFooter as Footer,
    CardHeader as Header,
    CardTitle as Title,
} from "@components/ui/card"
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react"
import { Button } from "@components/ui/button";
import { Link, useNavigate } from 'react-router-dom'

export default () => {

    const auth = useContext(authContext);

    const session = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const data = await auth.currentUser()?.getUserData();
            return data
        }
    })

    return (
        <Card>
            <Header>
                {session.isSuccess ?
                    <Title> Hello, {session.data?.email.split('@')[0]} </Title>
                    :
                    <Title> Hello, you </Title>
                }
            </Header>
            <Content>
                {session.isSuccess ?
                    <ul>
                        <Button variant='link'> <Link to='/profile'> profile </Link> </Button>
                    </ul>
                    :
                    <ul>
                        <Button> <Link to='/login'> Log in </Link> </Button>
                        <Button variant='secondary'> <Link to='signup'> Sign up </Link> </Button>
                    </ul>}
            </Content>
        </Card>
    )
}
