import {
    Card,
    CardHeader as Header,
    CardContent as Content,
    CardDescription as Description,
    CardFooter as Footer,
    CardTitle as Title,
} from "@components/ui/card"
import { useQuery } from "@tanstack/react-query";
import { extractEvents } from "@utils/ical-utils"
import EventCard from "@components/Calendar/EventCard";
import { Button } from '@components/ui/button'

interface Props {
    calendarFile: File
    onAdd: (data: any) => void
}


export default ({ calendarFile, onAdd }: Props) => {


    const contents = useQuery({
        queryKey: ['filedata', calendarFile.name],
        queryFn: async () => extractEvents(await calendarFile.text())
    })

    const handleAdd = () => {
        return contents.data!.map(
            e => {
                return {
                    startDate: e.start.toDateString(),
                    endDate: e.end.toDateString(),
                    startTime: e.start.toLocaleTimeString(),
                    endTime: e.end.toLocaleTimeString(),
                    title: e.title,
                    description: e.description,
                    location: ''
                }
            })
    }

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
                <b> events: {contents.data?.length} </b>
                {contents.isSuccess ?
                    contents.data.map(
                        (e, index) => { return <EventCard key={e.title + index} title={e.title} description={e.description} start={e.start} end={e.end} /> }
                    )
                    : "loading..."
                }
            </Content>
            <Footer>
                <Button disabled={contents.isError} onClick={_ => onAdd(handleAdd())} > Add events </Button>
            </Footer>
        </Card>

    )

}
