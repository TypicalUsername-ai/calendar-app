import {
    Card,
    CardContent as Content,
    CardDescription as Description,
    CardFooter as Footer,
    CardHeader as Header,
    CardTitle as Title,
} from "@components/ui/card"

interface Props {
    title: string,
    description: string,
    start: Date,
    end: Date,
    onDelete: () => void
}

export default ({ title, description, start, end }: Props) => {

    return (
        <Card>
            <Header>
                <Title> {title} </Title>
                <Description> {start.toISOString()} - {end.toISOString()} </Description>
            </Header>
            <Content>
                {description}
            </Content>
            <Footer>
            </Footer>
        </Card>

    )

}
