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
import { useNavigate } from 'react-router-dom'

export default () => {

    const auth = useContext(authContext);
    const navigate = useNavigate();

    const session = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const data = await auth.currentUser()?.getUserData();
            return data
        }
    })

    return (
        <Card className="w-56">
            <Header>
                {session.isSuccess ?
                    <Title> Hello, {session.data?.user_metadata.username} </Title>
                    :
                    <Title> Hello, you </Title>
                }
                <Description>
                    It's nice to see you
                </Description>
            </Header>
            <Content>
                {session.isSuccess ?
                    <ul>
                        <Button variant='link' onClick={() => navigate('/profile')}> profile  </Button>
                    </ul>
                    :
                    <ul>
                        <Button onClick={_ => navigate('/login')} >  Log in  </Button>
                        <Button variant='secondary' onClick={_ => navigate('/signup')}>  Sign up  </Button>
                    </ul>}
            </Content>
            <Footer />
        </Card>
    )
}
