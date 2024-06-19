const EVENT_REGEX = /(?<=BEGIN:VEVENT[\r\n]+)[\s\S]*?(?=END:VEVENT)/

export interface IcalEvent {
    title: string,
    description: string,
    start: Date,
    end: Date,
}

export const extractEvents = (icalString: string): IcalEvent[] => {
    const eventsStr = icalString.match(EVENT_REGEX) ?? [];
    const events = []
    for (const event of eventsStr) {
        const kvs = icsEventToObj(event);
        events.push({
            title: kvs.SUMMARY ?? "",
            description: kvs.DESCRIPTION ?? "",
            start: new Date(parseICalDate(kvs.DTSTART) ?? ""),
            end: new Date(parseICalDate(kvs.DTEND) ?? "")
        } as IcalEvent)
    }
    return events
}

const icsEventToObj = (data: string): any => {
    const eventObj: any = {};
    const lines = data.split(/\r?\n/); // Split by new lines, handling both \r\n and \n

    lines.forEach(line => {
        if (line.trim() !== "") { // Skip empty lines
            const [key, ...value] = line.split(':');
            eventObj[key.trim()] = value.join(':').trim();
        }
    });

    return eventObj;
}

const parseICalDate = (dateString: string) => {
    // Reformat the string into an ISO 8601 string

    const hasZ = dateString.endsWith('Z');
    const isoString = hasZ
        ? dateString.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z')
        : dateString.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6');

    // Create and return a new Date object
    return new Date(isoString);

    // Create and return a new Date object
    return new Date(isoString);
}
