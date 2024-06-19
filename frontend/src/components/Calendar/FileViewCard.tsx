import {
    Card,
    CardHeader as Header,
    CardContent as Content,
    CardDescription as Description,
    CardFooter as Footer,
    CardTitle as Title,
} from "@components/ui/card"
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label"
import { useQuery } from "@tanstack/react-query";

interface Props {
    calendarFile: File
}


export default ({ calendarFile }: Props) => {

    const contents = useQuery({
        queryKey: ['filedata', calendarFile.name],
        queryFn: async () => await calendarFile.text()
    })

    return (

        <Card>
            <Header>
                <Title>
                    {calendarFile.name}
                </Title>
                <Description>
                    {calendarFile.size} bytes (last modified {new Date(calendarFile.lastModified).toDateString()})
                </Description>
            </Header>
            <Content>
                <b> events: </b>
                <>{contents.data}</>
            </Content>
            <Footer>
            </Footer>
        </Card>

    )

}
