// Function to handle adding events
export const addEvent = (
    hour: number, 
    minutes: number, 
    col: string, 
    events: Record<string, any>, 
    setNewEvent: (eventKey: string) => void, 
    newEvent: any
): void => {
    /*
    Hours and minutes are converted in order to fit into indexing of the calendar 
    Explanation: 
    hour - hour picked by a user
    minutes - minutes picked by a user; 00min = 0, 15min = 1, 30min = 2, 45min = 3
    Indexing in calendar starts from 0 and is set to 6:00 ->  (6-6)*4+0=0 => 6:00
    (7-6)*4+2=6 =>  7:30
    */
    console.log(hour + minutes);
    let convertedIndex = ((hour - 6) * 4) + minutes;
    events[`${convertedIndex}-${col}`] = newEvent;
    setNewEvent(`${convertedIndex}-${col}`);
    console.log("events", events);
};

// Function to render events in the calendar
export const renderEvents = (
    row: number, 
    col: string, 
    events: Record<string, any>
): JSX.Element | null => {
    const eventKey = `${row}-${col}`;
    if (events.hasOwnProperty(eventKey)) {
        console.log("hasOwnProperty", eventKey);
        return <div className="bg-teal-500 rounded-lg drop-shadow-xl absolute w-56 h-10"></div>;
    } else {
        return null;
    }
};