import {
    Card,
    CardContent as Content,
    CardDescription as Description,
    CardFooter as Footer,
    CardHeader as Header,
    CardTitle as Title,
} from "@components/ui/card"
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label"

interface Props {
    onFileUpload: (file: File[]) => void
}

export default ({ onFileUpload }: Props) => {

    return (
        <Card>
            <Header>
                <Title> Import your events here </Title>
                <Description> Drop your <code>.ical</code> file below </Description>
            </Header>
            <Content>
                <Label htmlFor="icalinput"> Select file </Label>
                <Input type="file" id="icalinput" accept="text/calendar" onChange={e => onFileUpload(Array.from(e.target.files!))} />
            </Content>
        </Card>
    )
}
